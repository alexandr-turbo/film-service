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
  lazyComponent: true
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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
