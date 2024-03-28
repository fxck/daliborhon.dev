import { caisyClient } from "../graphql/caisyClient";
import { type IGenBlogArticleMetaFragment } from "../graphql/__generated/sdk";

export interface GetFeaturedBlogArticlesByLocale {
    locale: string;
    first: number;
    arr?: IGenBlogArticleMetaFragment[];
}

export const getFeaturedBlogArticlesByLocale = async ({ locale, first, arr = [] }: GetFeaturedBlogArticlesByLocale): Promise<IGenBlogArticleMetaFragment[]> => {
    const { allBlogArticle } = await caisyClient.featuredBlogArticlesByLocale({ locale, first });

    allBlogArticle?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    const docs = arr as IGenBlogArticleMetaFragment[];

    return docs.sort((a, b) => {
        return new Date(a._meta?.firstPublishedAt!).valueOf() - new Date(b._meta?.firstPublishedAt!).valueOf();
    });
};
