import { type InferType, q } from "groqd";
import { getLocalizedArrayQuery } from "../utils/queryUtils";
import { tagsFragment } from "./tags";

const projectMetaFragment = {
	_id: q.string(),
	title: getLocalizedArrayQuery("title"),
	description: getLocalizedArrayQuery("description"),
	projectStartDate: q.date(),
	projectSourceUrl: q.string(),
	tags: tagsFragment,
	icon: q.object({
		icon: q.string(),
		metadata: q.object({
			size: q.object({
				height: q.number(),
				width: q.number(),
			}),
			collectionId: q.string(),
			inlineSvg: q.string(),
			color: q
				.object({
					hex: q.string(),
					rgba: q.object({
						r: q.number(),
						g: q.number(),
						b: q.number(),
						a: q.number(),
					}),
				})
				.optional(),
		}),
	}),
};

export const allProjectsQuery = (maxRecent: number = -1) => {
	return q("*", { isArray: true })
		.filterByType("project")
		.order("projectStartDate desc")
		.slice(0, maxRecent === -1 ? -1 : maxRecent - 1)
		.grab(projectMetaFragment);
};

const allProjectsQueryType = allProjectsQuery(0);
export type Project = Unpacked<InferType<typeof allProjectsQueryType>>;
