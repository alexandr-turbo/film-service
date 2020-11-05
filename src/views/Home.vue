<template>
  <div class="home">
    <!-- <router-link tag="input" @click.prevent @keyup.enter="" v-model="search" :to="{ name: 'search', params: { searchPhrase: search } }">
    </router-link> -->
    <!-- <input v-model="search" @keyup.enter="enter(search)"> -->
    <component :is="currentView"></component>
    <div class="center">
      <button
        class="pretty"
        @click="
          switchView(
            'MoviesUpperSlick',
            'MoviesUpcoming',
            'MoviesPopular',
            'MoviesNowPlaying',
            'MoviesTopRated'
          )
        "
      >
        Movies
      </button>
      <button
        class="pretty"
        @click="
          switchView(
            'TVShowsUpperSlick',
            'TVShowsAiringToday',
            'TVShowsPopular',
            'TVShowsOnTheAir',
            'TVShowsTopRated'
          )
        "
      >
        TV Shows
      </button>
    </div>
    <component :is="currentView2"></component>
    <component :is="currentView3"></component>
    <component :is="currentView4"></component>
    <component :is="currentView5"></component>
  </div>
</template>

<script>
import MoviesUpperSlick from "../components/MoviesUpperSlick.vue";
import MoviesUpcoming from "../components/MoviesUpcoming.vue";
import MoviesPopular from "../components/MoviesPopular.vue";
import MoviesNowPlaying from "../components/MoviesNowPlaying.vue";
import MoviesTopRated from "../components/MoviesTopRated.vue";
import TVShowsUpperSlick from "../components/TVShowsUpperSlick.vue";
import TVShowsAiringToday from "../components/TVShowsAiringToday.vue";
import TVShowsPopular from "../components/TVShowsPopular.vue";
import TVShowsOnTheAir from "../components/TVShowsOnTheAir.vue";
import TVShowsTopRated from "../components/TVShowsTopRated.vue";

export default {
  name: "app",
  data () {
    return {
      currentView: "MoviesUpperSlick",
      currentView2: "MoviesUpcoming",
      currentView3: "MoviesPopular",
      currentView4: "MoviesNowPlaying",
      currentView5: "MoviesTopRated",
    };
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
    TVShowsTopRated,
  },
  methods: {
    switchView(view, view2, view3, view4, view5) {
      if (view) {
        this.currentView = view;
      }
      if (view2) {
        this.currentView2 = view2;
      }
      if (view3) {
        this.currentView3 = view3;
      }
      if (view4) {
        this.currentView4 = view4;
      }
      if (view5) {
        this.currentView5 = view5;
      }
    },
  },
};
</script>

<style>
/* #app {
  background: lime;
} */
.center {
  display: flex;
  justify-content: center;
}
/* .home {
  background: #1F0E50;
} */
</style>
