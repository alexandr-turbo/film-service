import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    // children: [
    //   {
    //     path: '/details/:movieType/:movieID',
    //     name: 'movie',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/Movie.vue'),
    //     props: true
    //   },
    //   {
    //     path: '/person/:actorID',
    //     name: 'actor',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/Actor.vue')
    //   },
    //   {
    //     path: '/search',
    //     name: 'search',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
    //   }
    // ]
  },
  {
    path: '/details/:movieType/:movieID',
    name: 'movie',
    component: () => import(/* webpackChunkName: "movie" */ '../views/Movie.vue'),
    props: true
  },
  {
    path: '/person/:actorID',
    name: 'actor',
    component: () => import(/* webpackChunkName: "person" */ '../views/Actor.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
    props: true
  },
  // {
  //   path: '/search/:query',
  //   name: 'search',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  // },
  {
    path: '/discover',
    name: 'discover',
    component: () => import(/* webpackChunkName: "search" */ '../views/Discover.vue'),
    props: true
  },
]

const router = new VueRouter({
  routes
})

export default router