import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import replaceLodashToSpace from '@/filters/replaceLodashToSpace'
import replaceAllToDash from '@/filters/replaceAllToDash'
import replaceDashToSpace from '@/filters/replaceDashToSpace'
import filmGenresMixin from "@/mixins/filmGenresMixin";
import Autocomplete from '@trevoreyre/autocomplete-vue'
// import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.use(Autocomplete)
Vue.config.productionTip = false
Vue.filter('replaceLodashToSpace', replaceLodashToSpace)
Vue.filter('replaceAllToDash', replaceAllToDash)
Vue.filter('replaceDashToSpace', replaceDashToSpace)

Vue.mixin({
  data() {
    return {
      globalImgAddress: 'https://image.tmdb.org/t/p/w',
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
  setTimeout(() => app.loading = false, 1500)
})