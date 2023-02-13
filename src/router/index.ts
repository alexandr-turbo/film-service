import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue'),
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
    component: () => import(/* webpackChunkName: "discover" */ '../views/Discover.vue'),
    props: true
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes,
  scrollBehavior() {
    const element = document.getElementById("app");
    if (element !== null) {
      element.scrollIntoView({ behavior: "smooth" });
    }
}
})

export default router