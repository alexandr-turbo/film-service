import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import capitalize from '@/filters/capitalize'
import movieGenresMixin from "@/mixins/movieGenresMixin";
import Autocomplete from '@trevoreyre/autocomplete-vue'
// import '@trevoreyre/autocomplete-vue/dist/style.css'

Vue.use(Autocomplete)
// Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.filter('capitalize', capitalize)

import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  lazyComponent: true,
  // preLoad: 1.3,
  // listenEvents: [ 'scroll' ],
  // attempt: 10,
  // observer: true,
  // observerOptions: {
  //   rootMargin: '0px',
  //   threshold: 0.1
  // }
})

Vue.mixin({
  data() {
    return {
      globalImgAddress: 'https://image.tmdb.org/t/p/w',
      // globalNoImgAddress: '@/assets/no-image.png'
    }
  }
})
Vue.mixin(movieGenresMixin)
const app = new Vue({
  data: { loading: false },
// new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// router.((to, from, next) => {
//   app.loading = true
//   next()
// });

router.afterEach(() => {
  app.loading = true
  setTimeout(() => app.loading = false, 3000) // timeout for demo purposes
})