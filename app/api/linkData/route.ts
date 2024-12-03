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
  const { hostname } = new URL(url);
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });
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

  const metaData: LinkWidgetData = {
    url,
    hostname,
    title,
    description,
    imageUrl,
    faviconLink,
  };

  return NextResponse.json(metaData);
}
