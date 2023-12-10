import * as cheerio from 'cheerio';

function createResponse(body: any, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status: status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url as string);
    const url = searchParams.get('url');

    // Basic input validation/sanitization
    if (!url || (!url.startsWith('http://') && !url.startsWith('https://'))) {
      return createResponse(
        {
          error: 'Invalid or no URL provided',
        },
        400,
      );
    }

    const res = await fetch(url);

    if (!res.ok) {
      return createResponse(
        {
          error: `Failed to fetch URL. Status: ${res.status} - ${res.statusText}`,
        },
        500,
      );
    }

    const html = await res.text();
    const $ = cheerio.load(html);
    const ogImage = $('meta[property="og:image"]').attr('content');

    if (!ogImage) {
      return createResponse(
        {
          error: 'No og:image found',
        },
        404,
      );
    }

    const isAbsoluteUrl = /^(https?:)?\/\//i;

    if (!isAbsoluteUrl.test(ogImage)) {
      // If the og:image value is a relative path, handle it here
      const domain = new URL(url).origin;
      const absoluteOgImage = `${domain}/${ogImage}`;

      return createResponse({
        ogImage: absoluteOgImage,
      });
    }

    return createResponse({
      ogImage,
    });
  } catch (error: any) {
    return createResponse(
      {
        error: error.message || 'Something went wrong',
      },
      500,
    );
  }
}
