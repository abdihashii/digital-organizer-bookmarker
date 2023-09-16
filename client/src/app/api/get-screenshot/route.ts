import { v2 as cloudinary } from 'cloudinary';
import puppeteer from 'puppeteer-core';
import {
	bufferToStream,
	sanitizeUrlForPublicId,
	screenshotExists,
	uploadToCloudinary,
	CloudinaryResponse,
} from '@/lib/getScreenshotUtils';

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

/**
 * Takes a screenshot of the target URL
 * @param request - The incoming request
 * @returns A screenshot of the target URL
 */
export async function GET(request: Request) {
	// Get the URL parameter from the request
	const { searchParams } = new URL(request.url);
	const url = searchParams.get('url');

	if (!url) {
		return new Response(
			JSON.stringify({
				status: 500,
				message: 'Unable to retrieve the URL! Please enter a valid URL.',
				url,
			}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}

	const browser = await puppeteer.connect({
		browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
	});
	const page = await browser.newPage();
	await page.goto(url);

	const sanitizedUrl = sanitizeUrlForPublicId(url);
	const publicId = `screenshot-${sanitizedUrl}`;

	const exists = await screenshotExists(publicId);

	if (exists) {
		return new Response(
			JSON.stringify({
				status: 200,
				browser,
				message:
					'Screenshot already exists! Here is the url to the screenshot:',
				secure_url: cloudinary.url(publicId),
			}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	}

	const screenshotBuffer = await page.screenshot();

	// Convert buffer to stream
	const stream = bufferToStream(screenshotBuffer);

	const cloudinaryResult: CloudinaryResponse = await uploadToCloudinary(
		stream,
		publicId,
	);

	await browser.close();

	return new Response(
		JSON.stringify({
			status: 200,
			browser,
			message: 'Screenshot successfully uploaded to Cloudinary!',
			secure_url: cloudinaryResult.secure_url,
		}),
		{
			headers: {
				'Content-Type': 'image/png',
			},
		},
	);
}
