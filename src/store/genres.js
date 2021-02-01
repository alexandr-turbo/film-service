import axios from "axios"
import store from '@/store'

const key = process.env.VUE_APP_MOVIEDB

export default {
  state: {
    MovieGenres: [],
    TVShowGenres: []
  },
  mutations: {
    setMovieGenres (state, genres) {
      state.MovieGenres = genres
    },
    setTVShowGenres (state, genres) {
      state.TVShowGenres = genres
    },
  },
  actions: {
    async loadMovieGenres ({ commit }) {
    const loc = store.state.locale.locale
      await axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=${loc}`
        )
        .then((response) => {
          commit('setMovieGenres', response.data.genres)
        });
    },
    async loadTVShowsGenres ({ commit }) {
      const loc = store.state.locale.locale
      await axios
        .get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=${loc}`
        )
        .then((response) => {
          commit('setTVShowGenres', response.data.genres)
        });
    }
  },
}