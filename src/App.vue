<template>
  <div id="app">
    <button v-for="tab in tabs" :key="tab" @click="selected = tab">
      {{ tab }}
    </button>

    <component :is="selected"></component>
  </div>
</template>

<script>
import Movies from './components/Movies.vue'
import TVShows from './components/TVShows.vue'
export default {
  name: 'app',
  data: function() {
    return {
      tabs: ["Movies", "TVShows"],
      selected: "Movies"
    };
  },
  components: {
    Movies,
    TVShows
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
