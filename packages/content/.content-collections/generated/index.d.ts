import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Post = GetTypeByName<typeof configuration, "posts">;
export declare const allPosts: Array<Post>;

export type Tag = GetTypeByName<typeof configuration, "tags">;
export declare const allTags: Array<Tag>;

export {};
