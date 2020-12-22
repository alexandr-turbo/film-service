<template>
  <div id="app">
    <Preloader v-if="$root.loading" />
    <SearchBarTemplate /> 
    <router-view />
    <FooterTemplate />
    <GoTop :right="30" :bottom="30" :has-outline="false" bg-color="#eb4e7a" />
  </div>
</template>
<script>
import SearchBarTemplate from "./components/SearchBarTemplate.vue";
import FooterTemplate from "./components/FooterTemplate.vue";
import GoTop from '@inotom/vue-go-top';
import Preloader from "./components/Preloader.vue";
export default {
  components: {
    SearchBarTemplate,
    FooterTemplate,
    Preloader,
    GoTop
  },
  created() {
    this.$store.dispatch('loadMovieGenres')
    this.$store.dispatch('loadTVShowsGenres')
  }
};
</script>
<style>
#app {
    margin-top: 0 !important;
}
body {
    margin: 0 !important;
  font-family: sans-serif;
}
.preloader { /* это точно должно быть тут? а не в своем копмоненте или в общем css файле*/
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  transition: 1s all;
  visibility: visible;
  animation-name: animation;
  animation-duration: 2s;
}
.loader {/* это точно должно быть тут? а не в своем копмоненте или в общем css файле*/
  width: 75px;
  height: 75px;
  border: 10px solid white;
  border-radius: 50%;
  border-top-color: blue;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: 1s spin infinite linear;
}
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
    opacity: 1;
  }
}
@keyframes animation {
    0%     {background:black; opacity: 1;}
    100.0%  {background:black; opacity: 0;}
}
</style>
