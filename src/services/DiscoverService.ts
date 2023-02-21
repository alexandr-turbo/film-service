import axios, { AxiosError, AxiosResponse } from "axios"
import store from '@/store'
import { globalAPIMovieDBAddress } from '@/main';
import { ISearchResult } from '@/interfaces/ISearchResult'

const key: string = process.env.VUE_APP_MOVIEDB;

export default class DiscoverService {
	static fetchDiscoverMovies(
		routeMediatype: string,
    routeSortBy: string,
    routeVote: number,
    routeActorID: number,
    routeGenreID: number,
    routeYear: number,
    routePage: number
	): Promise<ISearchResult> {
		const locale = store.getters.locale
		return axios
			.get(
				`${globalAPIMovieDBAddress}/3/discover/${routeMediatype}?api_key=${
					key
				}&language=${
					locale
				}&sort_by=${routeSortBy}&include_adult=false&include_video=false&vote_average.gte=${
					routeVote ? routeVote : ''
				}&with_people=${routeActorID ? routeActorID : ''}&with_genres=${
					routeGenreID ? routeGenreID : ''
				}&year=${routeYear ? routeYear : ''}&page=${routePage}`
			)
			.then((res: AxiosResponse) => res.data)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}

	static fetchDiscoverTVShows(
		routeMediatype: string,
    routeSortBy: string,
    routeVote: number,
    routeGenreID: number,
    routeYear: number,
    routePage: number
	): Promise<ISearchResult> {
		const locale = store.getters.locale
		return axios
			.get(
				`${globalAPIMovieDBAddress}/3/discover/${routeMediatype}?api_key=${
					key
				}&language=${
					locale
				}&sort_by=${routeSortBy}&include_adult=false&include_video=false&vote_average.gte=${
					routeVote ? routeVote : ''
				}&with_genres=${
					routeGenreID ? routeGenreID : ''
				}&first_air_date_year=${routeYear ? routeYear : ''}&page=${routePage}`
			)
			.then((res: AxiosResponse) => res.data)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}
}