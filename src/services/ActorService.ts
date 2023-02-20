import axios, { AxiosError, AxiosResponse } from "axios"
import store from '@/store'
import { globalAPIMovieDBAddress } from '@/main';
import { IActor } from "@/interfaces/IActor";
import { ICrew } from "@/interfaces/ICrew";
import { IRole } from "@/interfaces/IRole";

const key: string = process.env.VUE_APP_MOVIEDB;

export default class ActorService {
	static fetchActor(actorID: string): Promise<IActor> {
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
}