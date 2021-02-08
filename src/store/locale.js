export default {
  state: {
    locale: localStorage.getItem('locale') || 'en-US'
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
    locale: state => state.locale
  }
}