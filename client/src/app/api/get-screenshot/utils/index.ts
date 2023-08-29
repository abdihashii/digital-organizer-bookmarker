import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export interface CloudinaryResponse {
	url: string;
	secure_url: string;
	// ... any other fields you expect or need from Cloudinary response
}

/**
 * Replace characters that are not allowed in Cloudinary public_id
 * @param url - The URL to sanitize
 * @returns The sanitized URL
 */
export function sanitizeUrlForPublicId(url: string) {
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

export async function screenshotExists(public_id: string): Promise<boolean> {
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

export function bufferToStream(buffer: Buffer) {
	const stream = new Readable({
		read() {
			this.push(buffer);
			this.push(null);
		},
	});
	return stream;
}

export async function uploadToCloudinary(
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
