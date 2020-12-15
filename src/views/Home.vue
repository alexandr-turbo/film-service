<template>
  <div class="home">
    <HomeUpperSlickTemplate :filmType="filmType" :genres="genres" />
    <div class="container">
      <div class="center">
        <button class="home-btn" @click="switchType('movie')">
          Movies
        </button>
        <button class="home-btn" @click="switchType('tv')">
          TV Shows
        </button>
      </div>
      <HomeSlicksTemplate
        :filmSlickArr="filmSlickArr"
        :filmType="filmType"
        :genres="genres"
      />
    </div>
  </div>
</template>

<script>
import HomeUpperSlickTemplate from "../components/HomeUpperSlickTemplate.vue";
import HomeSlicksTemplate from "../components/HomeSlicksTemplate.vue";

export default {
  data() {
    return {
      filmType: "movie",
      genres: [],
      tvshowSlickArr: ["airing_today", "popular", "on_the_air", "top_rated"],
      movieSlickArr: ["upcoming", "popular", "now_playing", "top_rated"],
      filmSlickArr: [],
    };
  },
  components: {
    HomeUpperSlickTemplate,
    HomeSlicksTemplate,
  },
  created() {
    this.genres = this.$store.state.MovieGenres;
    this.filmSlickArr = this.movieSlickArr;
  },
  methods: {
    // switchView(view, view2) {
    //   if (view) {
    //     this.currentView = view;
    //   }
    //   if (view2) {
    //     this.currentView2 = view2;
    //   }
    // },
    switchType(type) {
      this.filmType = type;
      if (type === "tv") {
        this.genres = this.$store.state.TVShowGenres;
        this.filmSlickArr = this.tvshowSlickArr;
      } else if (type === "movie") {
        this.genres = this.$store.state.MovieGenres;
        this.filmSlickArr = this.movieSlickArr;
      }
      // console.log(type)
    },
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
  background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(rgba(255, 86, 132, 0.4)),
      color-stop(68%, rgba(83, 50, 201, 0.4))
    ),
    -webkit-gradient(linear, left top, right top, from(rgba(255, 86, 132, 0.4)), color-stop(68%, rgba(83, 50, 201, 0.4)));
  background-image: -webkit-linear-gradient(
      left,
      rgba(255, 86, 132, 0.4) 0%,
      rgba(83, 50, 201, 0.4) 68%
    ),
    -webkit-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(
            83,
            50,
            201,
            0.4
          )
          68%);
  background-image: -o-linear-gradient(
      left,
      rgba(255, 86, 132, 0.4) 0%,
      rgba(83, 50, 201, 0.4) 68%
    ),
    -o-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4)
          68%);
  background-image: linear-gradient(
      90deg,
      rgba(255, 86, 132, 0.4) 0%,
      rgba(83, 50, 201, 0.4) 68%
    ),
    linear-gradient(
      90deg,
      rgba(255, 86, 132, 0.4) 0%,
      rgba(83, 50, 201, 0.4) 68%
    );
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
  letter-spacing: 0.4rem;
  outline: none;
  padding: 30px 100px;
  margin: 0 10px;
  text-transform: uppercase;
}
</style>
