import { ISearchActor } from "./ISearchActor";
import { ISearchFilm } from "./ISearchFilm";
import { ISearchTVShow } from "./ISearchTVShow";

export class ISearchResult {
	page!: number;
	results!: Array<ISearchFilm | ISearchTVShow | ISearchActor>;
	total_pages!: number;
	total_results!: number;
}