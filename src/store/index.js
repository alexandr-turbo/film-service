import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)
const key = process.env.VUE_APP_MOVIEDB

export default new Vuex.Store({
  state: {
    MovieGenres: [],
    TVShowGenres: [],
    loading: true
  },
  mutations: {
    setMovieGenres (state, genres) {
      state.MovieGenres = genres
    },
    setTVShowGenres (state, genres) {
      state.TVShowGenres = genres
    },
    setLoadingTrue (state) {
      state.loading = true
    },
    setLoadingFalse (state) {
      state.loading = false
    }
  },
  actions: {
    async loadMovieGenres ({ commit }) {
      await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`
      )
      .then((response) => {
        commit('setMovieGenres', response.data.genres)
      });
    },
    async loadTVShowsGenres ({ commit }) {
      await axios
      .get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}`
      )
      .then((response) => {
        commit('setTVShowGenres', response.data.genres)
      });
    }
  }
})