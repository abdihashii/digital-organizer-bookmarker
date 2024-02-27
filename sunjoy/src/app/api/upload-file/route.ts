import { OpenAI } from 'openai';
import fs from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const writeFile = promisify(fs.writeFile);

export async function POST(req: Request) {
	try {
		if (!process.env.OPENAI_API_KEY) {
			throw new Error('OpenAI API key is required');
		}

		if (!openai) {
			throw new Error('OpenAI instance is required');
		}

		const { url } = await req.json();

		if (!url) {
			throw new Error('A URL is required');
		}

		const response = await fetch(url);

		if (!response.ok) {
			throw new Error('Failed to fetch URL');
		}

		const html = await response.text();

		if (!html) {
			throw new Error('No HTML found');
		}

		// Write HTML to temp file to this current directory
		const tempFilePath = join(process.cwd(), 'temp.html');

		// Write HTML to temp file
		await writeFile(tempFilePath, html, 'utf-8');

		// Upload file to OpenAI
		const file = await openai.files.create({
			file: fs.createReadStream(tempFilePath),
			purpose: 'assistants',
		});

		if (!file) {
			throw new Error('Unable to upload file to OpenAI');
		}

		// Delete temp file
		fs.unlink(tempFilePath, (err) => {
			if (err) {
				console.error('Error deleting temp file: ', err);
			}
		});

		return Response.json(
			{ file },
			{
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			},
		);
	} catch (error) {
		return Response.json(
			{
				error: error,
			},
			{
				status: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			},
		);
	}
}
