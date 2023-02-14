import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import localize from '@/filters/localize'
import BootstrapVue from 'bootstrap-vue';
import replaceAllToSpace from '@/filters/replaceAllToSpace'
import replaceAllToDash from '@/filters/replaceAllToDash'
import filmGenresMixin from "@/mixins/filmGenresMixin";
import dateFilter from '@/filters/dateFilter'
import components from './components';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(components);
Vue.use(BootstrapVue);
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.filter('replaceAllToSpace', replaceAllToSpace)
Vue.filter('replaceAllToDash', replaceAllToDash)
Vue.filter('dateFilter', dateFilter)
Vue.filter('localize', localize)

firebase.initializeApp({
  apiKey: "AIzaSyDsEK86cZs8r8fci26uH-z-wDbAxZs_tq8",
  authDomain: "vue-film-service.firebaseapp.com",
  projectId: "vue-film-service",
  storageBucket: "vue-film-service.appspot.com",
  messagingSenderId: "780918561593",
  appId: "1:780918561593:web:ec497a18d5778a5076e6e8",
  measurementId: "G-Z30VTMB4KJ"
});

export const Bus = new Vue();

export var globalAPIMovieDBAddress = 'https://api.themoviedb.org';
export var globalImgAddress = 'https://image.tmdb.org/t/p/w';

Vue.mixin(filmGenresMixin)

let app: Vue
firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      // data: {
      //   loading: false
      // },
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})

router.afterEach(() => {
  // app.loading = true
  app.$root.$emit('isLoading', true); // does not work
})