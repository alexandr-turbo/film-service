import { ISearchFilm } from "./ISearchFilm";

export class ISearchResult {
	page!: number;
	results!: Array<ISearchFilm>;
	total_pages!: number;
	total_results!: number;
}