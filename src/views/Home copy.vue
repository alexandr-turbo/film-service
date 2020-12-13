<template>
  <div class="home">
    <UpperSlick :movieType="movieType" />
    <!-- <component :is="currentView" /> -->
    <div class="center">
      <button
        class="home-btn"
        @click="switchType('movie')"
      >
        Movies
      </button>
      <button
        class="home-btn"
        @click="switchType('tv')"
      >
        TV Shows
      </button>
    </div>
    <!-- <component :is="currentView2" /> -->
  </div>
</template>

<script>
// import MoviesSlicks from "../components/MoviesSlicks.vue";
// import TVShowsSlicks from "../components/TVShowsSlicks.vue";
// import MoviesUpperSlick from "../components/MoviesUpperSlick.vue";
// import TVShowsUpperSlick from "../components/TVShowsUpperSlick.vue";
import UpperSlick from "../components/UpperSlick.vue";

export default {
  data() {
    return {
      currentView: "MoviesUpperSlick",
      currentView2: "MoviesSlicks",
      movieType: "movie"
    };
  },
  components: {
    // MoviesSlicks,
    // TVShowsSlicks,
    // MoviesUpperSlick,
    // TVShowsUpperSlick,
    UpperSlick,
  },
  methods: {
    switchView(view, view2) {
      if (view) {
        this.currentView = view;
      }
      if (view2) {
        this.currentView2 = view2;
      }
    },
    switchType(type) {
      this.movieType = type;
      // console.log(type)
    } 
  },
};
</script>

<style>
.home {
  background: -webkit-linear-gradient(285deg, #251431 0%, #161130 22%);
    background: -o-linear-gradient(285deg, #251431 0%, #161130 22%);
    background: linear-gradient(165deg, #251431 0%, #161130 22%);
    color: #fff;
}
.center {
  display: flex;
  justify-content: center;
}
.v2 {
  padding: 30px 200px !important;
  font-size: 32px;
  margin-top: 100px !important;
}
.home-btn {
  background: none;
    border: none;
    background-image: -webkit-gradient(linear, left top, right top, from(rgba(255, 86, 132, 0.4)), color-stop(68%, rgba(83, 50, 201, 0.4))), -webkit-gradient(linear, left top, right top, from(rgba(255, 86, 132, 0.4)), color-stop(68%, rgba(83, 50, 201, 0.4)));
    background-image: -webkit-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%), -webkit-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%);
    background-image: -o-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%), -o-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%);
    background-image: linear-gradient(90deg, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%), linear-gradient(90deg, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4) 68%);
    border-image-slice: 1;
    border-left: 3px solid rgba(255, 86, 132, 0.4);
    border-right: 3px solid rgba(83, 50, 201, 0.4);
    border-radius: 10px;
    background-position: 0 0, 0 100%;
    background-repeat: no-repeat;
    background-size: 100% 3px;
    color: #fff;
    cursor: pointer;
    display: block;
    font-family: "Alegreya Sans", sans-serif;
    font-weight: bold;
    letter-spacing: .4rem;
    outline: none;
    padding: 30px 100px;
    margin: 100px 10px 0;
    text-transform: uppercase;
}
</style>
