export interface LocaleState {
  locale: string
}

export default {
  state: (): LocaleState => ({
    locale: localStorage.getItem('locale') || 'en-US',
  }),
  mutations: {
    setLocale(state: LocaleState, locale: string) {
      state.locale = locale;
      localStorage.setItem('locale', locale);
    },
  },
  actions: {
  },
  getters: {
    locale: (state: LocaleState) => state.locale,
  }
}