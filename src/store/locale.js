export default {
  state: {
    locale: localStorage.getItem('locale') || ''
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale
      localStorage.setItem('locale', locale)
    },
  },
  actions: {
  },
  getters: {
  }
}