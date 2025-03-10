import { Resvg } from "@resvg/resvg-js";
import type { Post } from "@services/sanity/queries/posts";
import satori, { type SatoriOptions } from "satori";
import postOgImage from "./templates/post";
import siteOgImage from "./templates/site";

const fetchFonts = async () => {
	// Regular Font
	const fontFileRegular = await fetch("https://www.1001fonts.com/download/font/ibm-plex-mono.regular.ttf");
	const fontRegular: ArrayBuffer = await fontFileRegular.arrayBuffer();

	// Bold Font
	const fontFileBold = await fetch("https://www.1001fonts.com/download/font/ibm-plex-mono.bold.ttf");
	const fontBold: ArrayBuffer = await fontFileBold.arrayBuffer();

	return { fontRegular, fontBold };
};

const { fontRegular, fontBold } = await fetchFonts();

const options: SatoriOptions = {
	width: 1200,
	height: 630,
	embedFont: true,
	fonts: [
		{
			name: "IBM Plex Mono",
			data: fontRegular,
			weight: 400,
			style: "normal",
		},
		{
			name: "IBM Plex Mono",
			data: fontBold,
			weight: 600,
			style: "normal",
		},
	],
};

function svgBufferToPngBuffer(svg: string) {
	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	return pngData.asPng();
}

export async function generateOgImageForPost(post: Post, locale: string) {
	const svg = await satori(await postOgImage(post, locale), options);
	return svgBufferToPngBuffer(svg);
}

export async function generateOgImageForSite(locale: string) {
	const svg = await satori(await siteOgImage(locale), options);
	return svgBufferToPngBuffer(svg);
}
