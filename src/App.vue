<template>
  <div id="app">
    <Preloader v-if="$root.loading" />
    <SearchBar /> 
    <router-view />
    <Footer />
  </div>
</template>
<script>
import SearchBar from "./components/SearchBar.vue";
import Footer from "./components/Footer.vue";
import Preloader from "./components/Preloader.vue";
export default {
  components: {
    SearchBar,
    Footer,
    Preloader
  },
  created() {
    this.$store.dispatch('loadMovieGenres')
    this.$store.dispatch('loadTVShowsGenres')
  }
};
</script>
<style>
h1 {
      display: block;
      font-size: 2em;
      margin: 0.67em 0;
      font-weight: 300;
    }

    h2 {
      display: block;
      font-size: 1.5em;
      margin: 0.83em 0;
      font-weight: 300;
    }

    h3 {
      display: block;
      font-size: 1.17em;
      margin: 1em 0;
      font-weight: bold;
    }

    h4 {
      display: block;
      font-size: 1em;
      margin: 1.33em 0;
      font-weight: bold;
    }

    h5 {
      display: block;
      font-size: 0.83em;
      margin: 1.67em 0;
      font-weight: bold;
    }

    h6 {
      display: block;
      font-size: 0.67em;
      margin: 2.33em 0;
      font-weight: bold;
    }
body {
  /* margin: 0;
  padding: 0; */
  font-family: sans-serif;
  /* line-height: 1.5; */
}
button.button {
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  margin: 10px auto;
  outline: none;
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
.preloader {
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
