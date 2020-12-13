import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import replaceDash from '@/filters/replaceDash'
import movieGenresMixin from "@/mixins/movieGenresMixin";
import Autocomplete from '@trevoreyre/autocomplete-vue'
// import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.use(Autocomplete)
Vue.config.productionTip = false
Vue.filter('replaceDash', replaceDash)

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
Vue.mixin(movieGenresMixin)
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