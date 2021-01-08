import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import replaceAllToSpace from '@/filters/replaceAllToSpace'
import replaceAllToDash from '@/filters/replaceAllToDash'
import filmGenresMixin from "@/mixins/filmGenresMixin";
import Autocomplete from '@trevoreyre/autocomplete-vue'

Vue.use(Autocomplete)
Vue.config.productionTip = false
Vue.filter('replaceAllToSpace', replaceAllToSpace)
Vue.filter('replaceAllToDash', replaceAllToDash)

export const Bus = new Vue();

Vue.mixin({
  data() {
    return {
      globalImgAddress: 'https://image.tmdb.org/t/p/w',
      globalAPIMovieDBAddress: 'https://api.themoviedb.org'
    }
  }
})
Vue.mixin(filmGenresMixin)
const app = new Vue({
  data: { loading: false },
  router,
  store,
  render: h => h(App),
}).$mount('#app')

router.afterEach(() => {
  app.loading = true
})