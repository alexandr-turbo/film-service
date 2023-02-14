import Vue from 'vue'
import Vuex, { ModuleTree } from 'vuex'
import auth from './auth'
import info, { InfoState } from './info'
import genres, { GenresState } from './genres'
import locale, { LocaleState } from './locale'

Vue.use(Vuex)
export interface State {
  // auth: AuthState;
  info: InfoState;
  genres: GenresState;
  locale: LocaleState;
}
export default new Vuex.Store<State>({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  // getters: {
  // },
  modules: {
    auth: auth as ModuleTree<State>, info, genres, locale
  }
})