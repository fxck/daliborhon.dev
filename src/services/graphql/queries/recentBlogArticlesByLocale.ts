import { gql } from "@apollo/client";

export const q_recentBlogArticlesByLocale = gql`
    query recentBlogArticlesByLocale($locale: String!, $first: Int!) {
        allBlogArticle(locale: $locale, sort: { publishedAt: DESC }, first: $first) {
            edges {
                node {
                    ...blogArticleMeta
                }
            }
        }
    }
`;
