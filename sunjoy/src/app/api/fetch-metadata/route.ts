import { NextRequest, NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url") as string;

  try {
    const response = await ogs({ url });

    if (response.error) {
      throw response.error;
    }

    const { result } = response;

    const { ogImage } = result;

    if (!ogImage) {
      throw new Error("No ogImage found");
    }

    return new NextResponse(JSON.stringify({ ogImage: ogImage[0].url }), {
      headers: {
        "content-type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
