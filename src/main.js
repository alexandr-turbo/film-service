import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import replaceDash from '@/filters/replaceDash'
import filmGenresMixin from "@/mixins/filmGenresMixin";
import Autocomplete from '@trevoreyre/autocomplete-vue'
// import '@trevoreyre/autocomplete-vue/dist/style.css'
// import GoTop from '@inotom/vue-go-top';
Vue.use(Autocomplete)
Vue.config.productionTip = false
Vue.filter('replaceDash', replaceDash)
// Vue.use(GoTop);
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  lazyComponent: true,
})

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