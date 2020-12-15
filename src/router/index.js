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
    //     path: '/details/:filmType/:filmID',
    //     name: 'film',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/film.vue'),
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
  routes,
  scrollBehavior() {
    // document.getElementById('app').scrollIntoView({behavior: "smooth"});
    document.getElementById('app').scrollIntoView();
}
})

// router.beforeEach((to, from, next) => {
//   // this.$root.loading = true
//   console.log(1)
//   // console.log(this)
// 	next()
// })
// router.afterEach(() => {
//   // app.loading = true
//   console.log(2)
// 	// next()
// })

export default router