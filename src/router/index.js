import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    // children: [
    //   {
    //     path: '/about',
    //     name: 'about',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    //   },
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
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/details/:movieType/:movieID',
    name: 'movie',
    component: () => import(/* webpackChunkName: "about" */ '../views/Movie.vue'),
    props: true
  },
  {
    path: '/person/:actorID',
    name: 'actor',
    component: () => import(/* webpackChunkName: "about" */ '../views/Actor.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
  },
  {
    path: '/search/:query',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router