<template>
  <div id="app">
    <!-- <div id="page-preloader" class="preloader-2">
      <div class="loader">
        <span id="load_perc">0%</span>
      </div>
    </div> -->
    <!-- <div id="page-preloader" class="preloader">
      <div class="loader"></div>
    </div> -->
    <Preloader v-if="$root.loading" />
    <!-- <div v-else> -->
      <SearchBar />
      <router-view />
    <!-- </div> -->
  </div>
</template>
<script>
import SearchBar from "./components/SearchBar.vue";
import Preloader from "./components/Preloader.vue";
export default {
  data() {
    return {
      appQuery: "",
    };
  },
  components: {
    SearchBar,
    Preloader
  },
  created() {
    this.$store.dispatch('loadMovieGenres')
    this.$store.dispatch('loadTVShowsGenres')
  }
};
</script>
<style>
#app {
  background: lightcyan;
}
button.button {
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  margin: 10px auto;
}
button.pretty {
  padding: 10px 50px;
  border-radius: 10px;
  outline: none;
  background: none;
  margin: 0 10px;
}
.fixed {
  position: fixed;
  z-index: 100500;
  /* margin: auto; */
}
.container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
}
img.main-imgs {
  border-radius: 5px;
  height: 190px;
  width: auto;
  filter: brightness(0.8);
}
img.main-imgs:hover {
  transform: scale(1.1);
  filter: brightness(1);
}
.uppercase {
  text-transform: uppercase;
}
.left-text {
  text-align: left;
}
img.upper-imgs {
  margin: 0;
  padding: 0;
  height: auto;
  width: 100%;
}
/* .preloader-2 {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 10000000;
  transition: 1s all;
  opacity: 1;
  visibility: visible;
  background-color: white;
}
.loader {
  width: 100%;
  height: 75px;
  line-height: 75px;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 75px;
}
.done {
  opacity: 0;
  visibility: hidden;
} */
.preloader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /* background: black; */
  z-index: 1000;
  transition: 1s all;
  /* opacity: 1; */
  visibility: visible;
  /* animation: 1s; */
  animation-name: animation;
  animation-duration: 5s;
}
.loader {
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
.done {
  /* opacity: 0; */
  /* visibility: hidden; */
}
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 1;
    /* opacity: 1; */
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
    opacity: 1;
    /* opacity: 0; */

  }
}
/* @-webkit-keyframes animation {
    0%     {background-color:red;}
    50.0%  {background-color:#ff6666;}
    100.0%  {background-color:red;}
} */

@keyframes animation {
    0%     {background:black; opacity: 1;}
    /* 50.0%  {background: black; opacity: 0.5;} */
    100.0%  {background:black; opacity: 0;}
}
</style>
