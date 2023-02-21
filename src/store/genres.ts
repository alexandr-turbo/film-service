import { IGenre } from '@/interfaces/IGenre'
import GenresService from "@/services/GenresService";

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
    async fetchMovieGenres({commit}: {commit: any}) {
      await GenresService.fetchMovieGenres()
        .then((response) => {
          commit('setMovieGenres', response)
        });
    },
    async fetchTVShowsGenres({commit}: {commit: any}) {
      await GenresService.fetchTVShowsGenres()
        .then((response) => {
          commit('setTVShowGenres', response)
        });
    }
  },
  getters: {
    MovieGenres: (state: GenresState) => state.MovieGenres,
    TVShowGenres: (state: GenresState) => state.TVShowGenres,
  }
}