import { gql } from "@apollo/client";

export const q_featuredBlogArticlesByLocale = gql`
    query featuredBlogArticlesByLocale($locale: String!, $first: Int!, $featured: Boolean = true) {
        allBlogArticle(locale: $locale, where: { OR: { featured: $featured } }, sort: { publishedAt: DESC }, first: $first) {
            edges {
                node {
                    ...blogArticleMeta
                }
            }
        }
    }
`;
