<template>
  <div id="app">
    <TVShows />
  </div>
</template>

<script>
import TVShows from './components/TVShows.vue'
export default {
  name: 'app',
  components: {
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
