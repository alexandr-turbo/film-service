<template>
  <div id="app">
    <SearchBar />
    <router-view />
  </div>
</template>
<script>
import SearchBar from "./components/SearchBar.vue";
export default {
  data() {
    return {
      appQuery: "",
    };
  },
  components: {
    SearchBar,
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
</style>
