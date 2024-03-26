import type { APIRoute } from "astro";
import * as CSContent from "../../../content/resume/cs.md";
import * as ENContent from "../../../content/resume/cs.md";
import { mdToPdf } from "md-to-pdf";
import { locales, type AllowedLocales } from "@i18n/config";
import { getRoutingLocale } from "@i18n/utils";
import * as m from "$messages";
import { slugifyStr } from "@utils";

export async function getStaticPaths() {
    const paths = locales.map((locale) => {
        const filename = slugifyStr(locale, m.common__resume({}, { languageTag: locale as AllowedLocales }));
        return { params: { lang: getRoutingLocale(locale), filename: filename } };
    });

    return paths;
}

export const GET: APIRoute = async ({ params }) => {
    const lang = params.lang;
    const filename = params.filename + "-dalibor-hon.pdf";

    let headers = {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
    };

    if (import.meta.env.DEV) {
        headers["Content-Disposition"] = "";
    }

    // Expect default language
    if (lang === undefined) {
        const pdf = await mdToPdf({ content: CSContent.rawContent() }, { document_title: filename });
        return new Response(pdf.content, { status: 200, headers: headers });
    }

    if (lang === "en") {
        const pdf = await mdToPdf({ content: ENContent.rawContent() }, { document_title: filename });
        return new Response(pdf.content, { status: 200, headers: headers });
    }

    return new Response(null, { status: 404 });
};
