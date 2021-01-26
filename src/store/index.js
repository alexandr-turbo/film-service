import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import auth from './auth'
import info from './info'

Vue.use(Vuex)
const key = process.env.VUE_APP_MOVIEDB
// let loc = localStorage.getItem('locale')

export default new Vuex.Store({
  state: {
    MovieGenres: [],
    TVShowGenres: [],
    // loading: true
  },
  mutations: {
    setMovieGenres (state, genres) {
      state.MovieGenres = genres
      // console.log(state.MovieGenres)
    },
    setTVShowGenres (state, genres) {
      state.TVShowGenres = genres
    },
    // setLoadingTrue (state) {
    //   state.loading = true
    // },
    // setLoadingFalse (state) {
    //   state.loading = false
    // }
  },
  actions: {
    async loadMovieGenres ({ commit }) {
      const loc = localStorage.getItem('locale')
      // console.log(loc)
      await axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=${loc}`
        )
        .then((response) => {
          commit('setMovieGenres', response.data.genres)
        });
    },
    async loadTVShowsGenres ({ commit }) {
      const loc = localStorage.getItem('locale')
        await axios
        .get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=${loc}`
        )
        .then((response) => {
          commit('setTVShowGenres', response.data.genres)
        });
    }
  },
  modules: {
    auth, info
  }
})