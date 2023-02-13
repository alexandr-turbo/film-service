import { ISearchFilm } from "./ISearchFilm";

export interface ISearchActor {
	adult: boolean,
	bio: string,
	gender: number,
	id: number,
	known_for: Array<ISearchFilm>,
	known_for_department: string,
	name: string,
	popularity: number,
	profile_path: string,
}