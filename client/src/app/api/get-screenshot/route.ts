import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import playwright from 'playwright';
import {
	bufferToStream,
	sanitizeUrlForPublicId,
	screenshotExists,
	uploadToCloudinary,
	CloudinaryResponse,
} from './utils';

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
	const url = searchParams.get('url') || 'https://www.google.com';

	const browser = await playwright.chromium.launch();
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
