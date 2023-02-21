import axios, { AxiosError, AxiosResponse } from "axios"
import store from '@/store'
import { globalAPIMovieDBAddress } from '@/main';
import { IFilm } from "@/interfaces/IFilm";
import { ICast } from "@/interfaces/ICast";
import { ITrailer } from "@/interfaces/ITrailer";
import { IReview } from "@/interfaces/IReview";
import { ISearchFilm } from "@/interfaces/ISearchFilm";
import { ISearchResult } from "@/interfaces/ISearchResult";

const key: string = process.env.VUE_APP_MOVIEDB;

export default class FilmService {
	static fetchFilmByID(filmType: string, filmID: string): Promise<IFilm> {
		const locale = store.getters.locale
		return axios
			.get(
				`${globalAPIMovieDBAddress}/3/${filmType}/${filmID}?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}

	static fetchCastByFilmID(filmType: string, filmID: string): Promise<Array<ICast>> {
		const locale = store.getters.locale
		return axios
			.get(
        `${globalAPIMovieDBAddress}/3/${filmType}/${filmID}/credits?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data.cast)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}

	static fetchTrailersByFilmID(filmType: string, filmID: string): Promise<Array<ITrailer>> {
		const locale = store.getters.locale
		return axios
			.get(
        `${globalAPIMovieDBAddress}/3/${filmType}/${filmID}/reviews?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data.results)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}

	static fetchReviewsByFilmID(filmType: string, filmID: string): Promise<Array<IReview>> {
		const locale = store.getters.locale
		return axios
			.get(
        `${globalAPIMovieDBAddress}/3/${filmType}/${filmID}/reviews?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data.results)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}

	static fetchFilms(mediaType: string, mediaTypeType: string): Promise<Array<ISearchFilm>> {
		const locale = store.getters.locale
		return axios
			.get(
				`${globalAPIMovieDBAddress}/3/${mediaType}/${mediaTypeType}?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data.results)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}

	static searchFilms(mediaType: string, mediaTypeType: string, page: string | number): Promise<ISearchResult> {
		const locale = store.getters.locale
		return axios
			.get(
        `${globalAPIMovieDBAddress}/3/${mediaType}/${mediaTypeType}?api_key=${key}&page=${page}&include_adult=false&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}

	static searchFilmsByName(query: string, page: string | number): Promise<ISearchResult> {
		const locale = store.getters.locale
		return axios
			.get(
				`${globalAPIMovieDBAddress}/3/search/multi?api_key=${key}&query=${query}&page=${page}&include_adult=false&language=${locale}`
				)
			.then((res: AxiosResponse) => res.data)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}
}