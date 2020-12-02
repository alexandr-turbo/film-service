<template>
  <div class="home">
    <component :is="currentView"></component>
    <div class="center">
      <button
        class="pretty v2"
        @click="switchView('MoviesUpperSlick', 'MoviesSlicks')"
      >
        Movies
      </button>
      <button
        class="pretty v2"
        @click="switchView('TVShowsUpperSlick', 'TVShowsSlicks')"
      >
        TV Shows
      </button>
    </div>
    <component :is="currentView2"></component>
  </div>
</template>

<script>
import MoviesSlicks from "../components/MoviesSlicks.vue";
import TVShowsSlicks from "../components/TVShowsSlicks.vue";
import MoviesUpperSlick from "../components/MoviesUpperSlick.vue";
import TVShowsUpperSlick from "../components/TVShowsUpperSlick.vue";

export default {
  name: "app",
  data() {
    return {
      currentView: "MoviesUpperSlick",
      currentView2: "MoviesSlicks",
    };
  },
  components: {
    MoviesSlicks,
    TVShowsSlicks,
    MoviesUpperSlick,
    TVShowsUpperSlick,
  },
  methods: {
    // switchView(view, view2, view3, view4, view5) {
    switchView(view, view2) {
      if (view) {
        this.currentView = view;
      }
      if (view2) {
        this.currentView2 = view2;
      }
    },
  },
};
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  /* margin-top: 100px; */
}
.v2 {
  padding: 30px 200px !important;
  font-size: 32px;
  /* cursor: pointer; */
}
</style>
