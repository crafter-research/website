import { z } from "astro/zod";

export const authorId = z.enum(["railly", "shiarauzo"]);

export type AuthorId = z.infer<typeof authorId>;

export interface Author {
	id: AuthorId;
	name: string;
	avatar: string;
	github: string;
}

export const authors: Record<AuthorId, Author> = {
	railly: {
		id: "railly",
		name: "Railly Hugo",
		avatar: "/user/railly.jpg",
		github: "https://github.com/Railly",
	},
	shiarauzo: {
		id: "shiarauzo",
		name: "Shiara Arauzo",
		avatar: "/user/shiarauzo.jpg",
		github: "https://github.com/shiarauzo",
	},
};

export function getAuthor(id: AuthorId): Author {
	return authors[id];
}
