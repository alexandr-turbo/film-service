import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
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
] // я бы добавил еще страницу с ошибкой, если нет такой страницы или введен непрваильный путь. например опечатка в /dicover

const router = new VueRouter({
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView({behavior: "smooth"});
}
})

export default router