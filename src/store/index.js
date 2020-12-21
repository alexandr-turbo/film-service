import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
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
      let genres = []
      await axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        genres = response.data.genres;  // по моему тут можно сделать прям так commit('setMovieGenres', response.data.genres); (и так везде. лишнее действие делаешь и используешь переменную.) но это как хочешь можно и так
      });
      commit('setMovieGenres', genres)
    },
    async loadTVShowsGenres ({ commit }) {
      let genres = []
      await axios
      .get(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        genres = response.data.genres;
      });
      commit('setTVShowGenres', genres)
    }
  },
  getters: {
    movieGenresNames(state) {
      let b = state.MovieGenres.map(item => {return item.name}) // неинформативное имя
      return b
    },
    tvshowGenresNames(state) {
      let b = state.TVShowGenres.map(item => {return item.name})// неинформативное имя
      return b
    }
  }
})