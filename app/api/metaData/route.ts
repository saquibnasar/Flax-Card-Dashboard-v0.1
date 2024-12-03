import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import cheerio from "cheerio";

export interface LinkWidgetData {
  url: string;
  hostname?: string;
  title?: string;
  siteName?: string;
  description?: string;
  imageUrl?: string;
  faviconLink?: string;
  iosAppName?: string;
  androidAppName?: string;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const url = params.get("url") || "";

  try {
    if (!isValidUrl(url)) {
      throw new Error("Invalid URL");
    }

    const { hostname } = new URL(url);
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content");
    const imageUrl = $('meta[property="og:image"]').attr("content");
    const faviconLink =
      $('link[rel="icon"]').attr("href") ||
      $('link[rel="shortcut icon"]').attr("href");
    const siteName = $('meta[property="og:site_name"]').attr("content");

    const metaData: LinkWidgetData = {
      url,
      hostname,
      title,
      siteName,
      description,
      imageUrl,
      faviconLink,
    };

    return NextResponse.json(metaData);
  } catch (error) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
