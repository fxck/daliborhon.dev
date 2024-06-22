import { defineCollection, defineConfig } from "@content-collections/core";
import slug from "slug";

const locales = ["cs", "en"];

const posts = defineCollection({
	name: "posts",
	directory: "src/posts",
	include: "**/*.md",
	schema: (z) => ({
		title: z.string(),
		postId: z.string(),
		pubDateTime: z.string().datetime({ offset: true }),
		modDatetime: z.string().datetime({ offset: true }).optional(),
		hidden: z.boolean().optional(),
		description: z.string(),
		featured: z.boolean().default(false).optional(),
		language: z.enum(locales as [string, ...string[]], {
			errorMap: () => ({
				message: "Please select the correct locale!",
			}),
		}),
		author: z.string().default("Dalibor Hon"),
		ogImage: z.string().url().or(z.string()).optional(),
		tags: z.array(z.string()),
		category: z.string().optional(),
		canonicalURL: z.string().optional(),
	}),
	transform: async (doc, { documents }) => {
		const postTags = await documents(tags).find((a) => doc.tags.includes(a.id));
		return {
			slug: slug(doc.title, { locale: doc.language }),
			...doc,
			postTags: postTags,
		};
	},
});

const tags = defineCollection({
	name: "tags",
	directory: "src/tags",
	include: "**/*.json",
	parser: "json",
	schema: (z) => ({
		id: z.string(),
		languages: z.object({
			cs: z.string(),
			en: z.string(),
		}),
	}),
	transform: async (doc) => {
		return {
			id: doc.id,
			languages: doc.languages,
		};
	},
});

export default defineConfig({
	collections: [posts, tags],
});
