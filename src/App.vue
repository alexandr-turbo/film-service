<template>
  <div id="app">
    <FilmService />
  </div>
</template>

<script>
import FilmService from './components/FilmService.vue'
export default {
  name: 'app',
  components: {
    FilmService
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
