import { OpenAI } from 'openai';
import fs from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const writeFile = promisify(fs.writeFile);

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return Response.json(
      { error: 'URL is required' },
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const response = await fetch(url);

  if (!response.ok) {
    return Response.json(
      { error: 'Failed to fetch URL' },
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  }

  const html = await response.text();

  // Write HTML to temp file to this current directory
  const tempFilePath = join(process.cwd(), 'temp.html');

  // Write HTML to temp file
  await writeFile(tempFilePath, html, 'utf-8');

  // Upload file to OpenAI
  const file = await openai.files.create({
    file: fs.createReadStream(tempFilePath),
    purpose: 'assistants',
  });

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
    }
  );
}
