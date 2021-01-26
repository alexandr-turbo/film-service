import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    meta: {layout: 'empty'},
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue'),
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),

  },
  {
    path: '/details/:filmType/:filmID',
    name: 'film',
    meta: {layout: 'main'},
    component: () => import(/* webpackChunkName: "film" */ '../views/Film.vue'),
    props: true
  },
  {
    path: '/person/:actorID',
    name: 'actor',
    meta: {layout: 'main'},
    component: () => import(/* webpackChunkName: "person" */ '../views/Actor.vue')
  },
  {
    path: '/search',
    name: 'search',
    meta: {layout: 'main'},
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
    props: true
  },
  {
    path: '/discover',
    name: 'discover',
    meta: {layout: 'main'},
    component: () => import(/* webpackChunkName: "discover" */ '../views/Discover.vue'),
    props: true
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth.vue'),
    props: true
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import(/* webpackChunkName: "register" */ '../views/Auth.vue'),
    props: true
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({behavior: "smooth"});
}
})

export default router