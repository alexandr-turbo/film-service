import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import capitalize from '@/filters/capitalize'

// Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.filter('capitalize', capitalize)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
