import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import crypto from 'crypto';

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

function getHashedString(input: string): string {
	return crypto.createHash('md5').update(input).digest('hex');
}

async function screenshotExists(publicId: string): Promise<boolean> {
	try {
		const result = await cloudinary.api.resource(publicId);
		return !!result; // Return true if result exists
	} catch (error) {
		return false;
	}
}

function bufferToStream(buffer: Buffer) {
	const stream = new Readable();
	stream.push(buffer);
	stream.push(null); // Indicates EOF
	stream.on('data', (chunk) => {
		console.log('Stream chunk:', chunk);
	});
	return stream;
}

async function uploadToCloudinary(
	stream: Readable,
	urlHash: string,
): Promise<CloudinaryResponse> {
	const publicId = `screenshot-${urlHash}`;

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

		const urlHash = getHashedString(url);
		const publicId = `screenshot-${urlHash}`;

		// Check if cloudinary already has a screenshot of this URL
		// If so, return the existing screenshot
		// const exitsts = await screenshotExists(publicId);

		// if (exitsts) {
		// 	// If the screenshot already exists, return its URL
		// 	return new Response(
		// 		JSON.stringify({
		// 			status: 200,
		// 			message: 'Screenshot already exists.',
		// 			url: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}.webp`,
		// 		}),
		// 		{
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 			},
		// 		},
		// 	);
		// }

		// Upload stream to Cloudinary
		const cloudinaryResult: CloudinaryResponse = await uploadToCloudinary(
			stream,
			urlHash,
		);

		return new Response(
			JSON.stringify({
				status: 200,
				message: 'Screenshot captured and uploaded successfully!',
				// url: `${cloudinaryResult.url}/f_auto,q_auto:good`, // URL of the uploaded screenshot on Cloudinary
				url: cloudinaryResult.url,
			}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	} catch (error: any) {
		console.error('Full error:', error);
		// Return a more user-friendly error message for common errors
		if (error.message.includes('Timeout')) {
			return new Response(
				JSON.stringify({
					status: 408,
					message: 'Request to the target URL timed out',
				}),
				{
					status: 408,
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
