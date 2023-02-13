import axios from "axios"
import store from '@/store'
import { IGenre } from '@/interfaces/IGenre'

const key: string = process.env.VUE_APP_MOVIEDB;

export interface GenresState {
  MovieGenres: Array<IGenre>,
  TVShowGenres: Array<IGenre>,
}

export default {
  state: {
    MovieGenres: [],
    TVShowGenres: []
  },
  mutations: {
    setMovieGenres (state: GenresState, genres: Array<IGenre>) {
      state.MovieGenres = genres
      
    },
    setTVShowGenres (state: GenresState, genres: Array<IGenre>) {
      state.TVShowGenres = genres
    },
  },
  actions: {
    async loadMovieGenres({commit}: {commit: any}) {
    const locale = store.getters.locale
      await axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=${locale}`
        )
        .then((response) => {
          commit('setMovieGenres', response.data.genres)
        });
    },
    async loadTVShowsGenres({commit}: {commit: any}) {
      const locale = store.getters.locale
      await axios
        .get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=${locale}`
        )
        .then((response) => {
          commit('setTVShowGenres', response.data.genres)
        });
    }
  },
  getters: {
    MovieGenres: (state: GenresState) => state.MovieGenres,
    TVShowGenres: (state: GenresState) => state.TVShowGenres,
  }
}