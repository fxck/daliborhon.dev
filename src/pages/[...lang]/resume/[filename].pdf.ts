import type { APIRoute } from "astro";
import * as CSContent from "../../../content/resume/cs.md";
import * as ENContent from "../../../content/resume/cs.md";
import { mdToPdf } from "md-to-pdf";
import { locales, type AllowedLocales } from "@i18n/config";
import { getRoutingLocale } from "@i18n/utils";
import * as m from "$messages";

export async function getStaticPaths() {
    const paths = locales.map((locale) => {
        return { params: { lang: getRoutingLocale(locale), filename: m.common__resume({}, { languageTag: locale as AllowedLocales }) } };
    });

    return paths;
}

export const GET: APIRoute = async ({ params }) => {
    const lang = params.lang;

    const headers = {
        "Content-Type": "application/pdf",
    };

    // Expect default language
    if (lang === undefined) {
        const pdf = await mdToPdf({ content: CSContent.rawContent() });
        return new Response(pdf.content, { status: 200, headers: headers });
    }

    if (lang === "en") {
        const pdf = await mdToPdf({ content: ENContent.rawContent() });
        return new Response(pdf.content, { status: 200, headers: headers });
    }

    return new Response(null, { status: 404 });
};
