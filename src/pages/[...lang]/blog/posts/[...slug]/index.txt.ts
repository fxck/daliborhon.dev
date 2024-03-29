import type { APIContext } from "astro";

export async function getStaticPaths() {
    const slugs = ["01", "02", "03", "04", "05", "06", "07"];
    const locales = ["cs", "en"];
    const defaultLocale = "cs";

    function getRoutingLocale(locale: string | undefined) {
        if (locale === defaultLocale) {
            return undefined;
        }

        return locale;
    }

    const paths = locales.flatMap((locale) => {

        return slugs.map((slug)=> {
            return { params: { lang: getRoutingLocale(locale), slug: slug }, props: { lang: locale } };
        })
        
    });

    return paths;
}

export async function GET({ params, props }: APIContext) {
    return new Response("this is a text", {
        headers: { "Content-Type": "text/plan" },
    });
}
