import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import genres from './genres'
import locale from './locale'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, info, genres, locale
  }
})