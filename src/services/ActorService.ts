import axios, { AxiosError, AxiosResponse } from "axios"
import store from '@/store'
import { globalAPIMovieDBAddress } from '@/main';
import { IActor } from "@/interfaces/IActor";
import { ICrew } from "@/interfaces/ICrew";
import { IRole } from "@/interfaces/IRole";
import { ISearchActor } from "@/interfaces/ISearchActor";
import { ISearchResult } from "@/interfaces/ISearchResult";

const key: string = process.env.VUE_APP_MOVIEDB;

export default class ActorService {
	static searchActor(input: string): Promise<Array<ISearchActor>> {
		const locale = store.getters.locale
		return axios
			.get(
        `${globalAPIMovieDBAddress}/3/search/person?api_key=${key}&language=${locale}&query=${input}&include_adult=false&page=1`
			)
			.then((res: AxiosResponse) => res.data.results)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}
	static fetchActor(actorID: string | number): Promise<IActor> {
		const locale = store.getters.locale
		return axios
			.get(
        `${globalAPIMovieDBAddress}/3/person/${actorID}?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}
	static fetchSearchActor(actorID: number): Promise<ISearchActor> {
		const locale = store.getters.locale
		return axios
			.get(
        `${globalAPIMovieDBAddress}/3/person/${actorID}?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => res.data)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}
	static fetchActorsCastCrew(actorID: string): Promise<{cast: Array<IRole>, crew: Array<ICrew>}> {
		const locale = store.getters.locale
		return axios
			.get(
				`${globalAPIMovieDBAddress}/3/person/${actorID}/combined_credits?api_key=${key}&language=${locale}`
			)
			.then((res: AxiosResponse) => ({ cast: res.data.cast, crew: res.data.crew }))
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}
	static fetchPopularPeople(page: string | number): Promise<ISearchResult> {
		const locale = store.getters.locale
		return axios
			.get(
        `${globalAPIMovieDBAddress}/3/person/popular?api_key=${key}&language=${locale}&page=${page}`
			)
			.then((res: AxiosResponse) => res.data)
      .catch((error: AxiosError) => {
        throw error.response;
      });
	}
}