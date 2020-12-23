import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/views/NotFound'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: NotFound
  },
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),

  },
  {
    path: '/details/:filmType/:filmID',
    name: 'film',
    component: () => import(/* webpackChunkName: "film" */ '../views/Film.vue'),
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
  {
    path: '/discover',
    name: 'discover',
    component: () => import(/* webpackChunkName: "search" */ '../views/Discover.vue'),
    props: true
  },
]

const router = new VueRouter({
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({behavior: "smooth"});
}
})

export default router