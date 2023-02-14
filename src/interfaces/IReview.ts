import { IAuthor } from "./IAuthor";

export interface IReview {
	author: string,
	author_details: IAuthor,
	content: string,
	created_at: string,
	id: string,
	updated_at: string,
	url: string,
}