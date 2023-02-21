import axios, { AxiosError, AxiosResponse } from "axios"
import store from '@/store'
import { IGenre } from "@/interfaces/IGenre";
import { globalAPIMovieDBAddress } from '@/main';

const key: string = process.env.VUE_APP_MOVIEDB;

export default class GenresService {
	static fetchMovieGenres(): Promise<Array<IGenre>> {
		const locale = store.getters.locale
		return axios
			.get(
				`${globalAPIMovieDBAddress}/3/genre/movie/list?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data.genres)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}

	static fetchTVShowsGenres(): Promise<Array<IGenre>> {
		const locale = store.getters.locale
		return axios
			.get(
				`${globalAPIMovieDBAddress}/3/genre/tv/list?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data.genres)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}
}