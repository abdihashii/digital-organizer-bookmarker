import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

interface CloudinaryResponse {
	url: string;
	secure_url: string;
	// ... any other fields you expect or need from Cloudinary response
}

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

/**
 * Replace characters that are not allowed in Cloudinary public_id
 * @param url - The URL to sanitize
 * @returns The sanitized URL
 */
function sanitizeUrlForPublicId(url: string) {
	// Remove the protocol (http/https)
	let sanitizedUrl = url.replace(/^https?:\/\//, '');

	// Replace forward slashes with hyphens
	sanitizedUrl = sanitizedUrl.replace(/\//g, '-');

	// Replace non-allowed characters with '-'
	sanitizedUrl = sanitizedUrl.replace(/[^a-zA-Z0-9\-_.]/g, '-');

	// Remove consecutive hyphens
	sanitizedUrl = sanitizedUrl.replace(/-{2,}/g, '-');

	// Remove leading and trailing hyphens
	sanitizedUrl = sanitizedUrl.replace(/^-|-$/g, '');

	return sanitizedUrl;
}

async function screenshotExists(public_id: string): Promise<boolean> {
	try {
		const result = await cloudinary.api.resource(public_id);

		return !!result;
	} catch (error: any) {
		console.log(
			`Error checking for existing screenshot in Cloudinary: ${JSON.stringify(
				error,
				null,
				2,
			)}\n\n`,
		);

		// Check if the error is due to the screenshot not existing (i.e., a 404 error)
		if (error.error?.http_code === 404) {
			return false;
		}

		// For other errors, re-throw them to handle outside this function
		throw error;
	}
}

function bufferToStream(buffer: Buffer) {
	const stream = new Readable({
		read() {
			this.push(buffer);
			this.push(null);
		},
	});
	return stream;
}

async function uploadToCloudinary(
	stream: Readable,
	publicId: string,
): Promise<CloudinaryResponse> {
	console.log('Uploading to Cloudinary...');
	console.log('Public ID:', publicId);

	return new Promise((resolve, reject) => {
		const cloudStream = cloudinary.uploader.upload_stream(
			{
				resource_type: 'image',
				public_id: publicId,
			},
			(error, result) => {
				if (error) {
					console.error('Cloudinary upload error:', error);
					reject(error);
				} else if (result) {
					console.log('Cloudinary upload success:', result);
					resolve(result);
				} else {
					reject(new Error('Unknown error uploading to Cloudinary'));
				}
			},
		);

		stream.pipe(cloudStream);
	});
}

/**
 * Takes a screenshot of the target URL
 * @param request - The incoming request
 * @returns A screenshot of the target URL
 */
export async function GET(request: Request) {
	// Get the URL parameter from the request
	const { searchParams } = new URL(request.url);
	const url = searchParams.get('url');

	// If the URL parameter is missing, return a 400 error
	if (!url) {
		return NextResponse.json({
			status: 400,
			body: 'Missing URL parameter',
		});
	}

	let browser;

	try {
		// Launch a new instance of Puppeteer
		browser = await puppeteer.launch();
		const page = await browser.newPage();

		// Set the viewport's width and height
		await page.setViewport({
			width: 1280,
			height: 720,
			deviceScaleFactor: 1,
		});

		// Navigate to the page
		const response = await page.goto(url, {
			waitUntil: 'networkidle2', // ensures the webpge fully loads before the screenshot is taken
			timeout: 30000,
		});

		if (response?.status() !== 200) {
			throw new Error(`Failed to load URL. HTTP Status: ${response?.status()}`);
		}

		// Capture the screenshot and return it
		const screenshot = await page.screenshot({
			type: 'webp',
		});

		// Convert buffer to stream
		const stream = bufferToStream(screenshot);

		const sanitizedUrl = sanitizeUrlForPublicId(url);
		const publicId = `screenshot-${sanitizedUrl}`;

		// Check if cloudinary already has a screenshot of this URL
		// If so, return the existing screenshot
		const existingImage = await screenshotExists(publicId);
		if (existingImage) {
			return new Response(
				JSON.stringify({
					status: 200,
					message: 'Screenshot already exists.',
					url,
				}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
		}

		// If we reach here, it means the screenshot does not exist, so upload it
		const cloudinaryResult: CloudinaryResponse = await uploadToCloudinary(
			stream,
			publicId,
		);

		return new Response(
			JSON.stringify({
				status: 200,
				message: 'Screenshot captured and uploaded successfully!',
				url: cloudinaryResult.secure_url,
			}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	} catch (error: any) {
		console.error('Full error:', error);

		// Handle different types of errors if necessary
		if (error.http_code && error.http_code !== 404) {
			return new Response(
				JSON.stringify({
					status: error.http_code,
					message: error.message,
				}),
				{
					status: error.http_code,
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
		}

		return new Response(
			JSON.stringify({
				status: 500,
				message:
					error.message || 'Error taking screenshot. Internal server error',
			}),
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	} finally {
		// Ensure browser instance is closed
		if (browser) {
			await browser.close();
			console.log('Browser instance closed');
		}
	}
}
