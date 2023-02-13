import { IGenre } from "@/interfaces/IGenre";
import { IProductionCompany } from "@/interfaces/IProductionCompany";
import { IProductionCountry } from "@/interfaces/IProductionCountry";
import { ISpokenLanguage } from "@/interfaces/ISpokenLanguage";

export interface IFilm {
	adult: boolean,
	backdrop_path: string,
	belongs_to_collection: any,
	budget: number,
	genres: Array<IGenre>,
	homepage: string,
	id: number,
	imdb_id: string,
	original_language: string,
	original_title: string,
	overview: string,
	popularity: number,
	poster_path: string, 
	production_companies: Array<IProductionCompany>,
	production_countries: Array<IProductionCountry>,
	release_date: string,
	revenue: number,
	runtime: number,
	spoken_languages: Array<ISpokenLanguage>,
	status: string,
	tagline: string,
	title: string,
	video: boolean,
	vote_average: number,
	vote_count: number
}