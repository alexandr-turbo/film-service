<template>
  <div id="app">
    <component :is="currentView"></component>
    <button @click="switchView('MoviesUpperSlick', 'MoviesUpcoming', 'MoviesPopular', 'MoviesNowPlaying', 'MoviesTopRated')">Movies</button>
    <button @click="switchView('TVShowsUpperSlick', 'TVShowsAiringToday', 'TVShowsPopular', 'TVShowsOnTheAir', 'TVShowsTopRated')">TV Shows</button>
    <component :is="currentView2"></component>
    <component :is="currentView3"></component>
    <component :is="currentView4"></component>
    <component :is="currentView5"></component>
  </div>
</template>

<script>
import MoviesUpperSlick from './components/MoviesUpperSlick.vue'
import MoviesUpcoming from './components/MoviesUpcoming.vue'
import MoviesPopular from './components/MoviesPopular.vue'
import MoviesNowPlaying from './components/MoviesNowPlaying.vue'
import MoviesTopRated from './components/MoviesTopRated.vue'
import TVShowsUpperSlick from './components/TVShowsUpperSlick.vue'
import TVShowsAiringToday from './components/TVShowsAiringToday.vue'
import TVShowsPopular from './components/TVShowsPopular.vue'
import TVShowsOnTheAir from './components/TVShowsOnTheAir.vue'
import TVShowsTopRated from './components/TVShowsTopRated.vue'
export default {
  name: 'app',
  data: function() {
    return {
    currentView: 'MoviesUpperSlick',
    currentView2: 'MoviesUpcoming',
    currentView3: 'MoviesPopular',
    currentView4: 'MoviesNowPlaying',
    currentView5: 'MoviesTopRated'
    }
  },
  components: {
    MoviesUpperSlick,
    MoviesUpcoming,
    MoviesPopular,
    MoviesNowPlaying,
    MoviesTopRated,
    TVShowsUpperSlick,
    TVShowsAiringToday,
    TVShowsPopular,
    TVShowsOnTheAir,
    TVShowsTopRated
  },
  methods: {
    switchView: function (view, view2, view3, view4, view5) {
      this.currentView = view,
      this.currentView2 = view2,
      this.currentView3 = view3,
      this.currentView4 = view4,
      this.currentView4 = view5
    }
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
