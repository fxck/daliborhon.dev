import { defaultLocale, locales } from "@i18n/config";

export function getRoutingLocale(locale: string | undefined) {
    if (locale === defaultLocale) {
        return undefined;
    }

    return locale;
}

// i18n routing
export async function getStaticPaths() {
    const paths = locales.map((locale) => {
        return { params: { lang: getRoutingLocale(locale) }, props: { lang: locale } };
    });

    return paths;
}
