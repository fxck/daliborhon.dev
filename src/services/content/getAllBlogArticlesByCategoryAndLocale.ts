import { caisyClient } from "../graphql/caisyClient";
import { type IGenBlogArticleMetaFragment } from "../graphql/__generated/sdk";

export interface GetAllBlogArticlesByCategoryAndLocale {
    locale: string;
    categoryName: string;
    after?: string;
    arr?: IGenBlogArticleMetaFragment[];
}

export const getAllBlogArticlesByCategoryAndLocale = async ({ locale, categoryName, after, arr = [] }: GetAllBlogArticlesByCategoryAndLocale): Promise<IGenBlogArticleMetaFragment[]> => {
    const { allBlogArticle } = await caisyClient.allBlogArticlesByCategoryAndLocale({ locale, categoryName, after });

    allBlogArticle?.edges?.forEach((edge) => {
        edge?.node && arr.push(edge.node);
    });

    if (allBlogArticle?.pageInfo?.hasNextPage) {
        return await getAllBlogArticlesByCategoryAndLocale({
            locale: locale,
            categoryName,
            after: allBlogArticle?.pageInfo?.endCursor ?? undefined,
            arr,
        });
    }

    const docs = arr as IGenBlogArticleMetaFragment[];

    return docs.sort((a, b) => {
        return new Date(a._meta?.firstPublishedAt!).valueOf() - new Date(b._meta?.firstPublishedAt!).valueOf();
    });
};
