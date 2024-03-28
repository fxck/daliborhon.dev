import type { APIRoute } from "astro";
import * as CSContent from "../../../content/resume/cs.md";
import * as ENContent from "../../../content/resume/cs.md";
import { mdToPdf } from "md-to-pdf";
import { locales } from "@i18n/config";
import { getRoutingLocale } from "@i18n/utils";
import { createResumePdfFilename } from "@utils";

export async function getStaticPaths() {
    const paths = locales.map((locale) => {
        const filename = createResumePdfFilename(locale);
        return { params: { lang: getRoutingLocale(locale), filename: filename } };
    });

    return paths;
}

export const GET: APIRoute = async ({ params }) => {
    let headers = {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${params.filename}"`,
    };

    if (import.meta.env.DEV) {
        headers["Content-Disposition"] = "";
    }

    // Expect default language
    if (params.lang === undefined) {
        const pdf = await mdToPdf({ content: CSContent.rawContent() }, { document_title: params.filename });
        return new Response(pdf.content, { status: 200, headers: headers });
    }

    if (params.lang === "en") {
        const pdf = await mdToPdf({ content: ENContent.rawContent() }, { document_title: params.filename });
        return new Response(pdf.content, { status: 200, headers: headers });
    }

    return new Response(null, { status: 404 });
};
