<template>
  <div class="home">
    <HomeUpperSlickTemplate
      :filmType="filmType"
      :genres="genres"
      :popular="popular"
    />
    <div class="container">
      <div class="home__buttons">
        <button class="home__switch-button" @click="switchType('movie')">
          Movies
        </button>
        <button class="home__switch-button" @click="switchType('tv')">
          TV Shows
        </button>
      </div>
      <div v-for="(filmSlick, index) in filmSlickArr" :key="filmSlick.id">
        <HomeSlickTemplate
          :type1="type1[index]"
          :type="filmSlick"
          :filmType="filmType"
          :genres="genres"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HomeUpperSlickTemplate from "../components/HomeUpperSlickTemplate.vue";
import HomeSlickTemplate from "../components/HomeSlickTemplate.vue";
import axios from "axios";

export default {
  data() {
    return {
      type1: [],
      popular: [],
      key: process.env.VUE_APP_MOVIEDB,
      filmType: "movie",
      genres: [],
      tvshowSlickArr: ["airing_today", "popular", "on_the_air", "top_rated"],
      movieSlickArr: ["upcoming", "popular", "now_playing", "top_rated"],
      filmSlickArr: [],
    };
  },
  components: {
    HomeUpperSlickTemplate,
    HomeSlickTemplate,
  },
  async created() {
    this.genres = this.$store.state.MovieGenres;
    this.filmSlickArr = this.movieSlickArr;
    let p1 = await this.getPopularFilms();
    let p2 = await this.getFilms();
    Promise.all([p1, p2]).then((this.$root.loading = false));
  },
  watch: {
    filmType() {
      this.popular = [];
      this.getPopularFilms();
      this.type1 = [];
      this.getFilms();
    },
  },
  methods: {
    async getPopularFilms() {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/${this.filmType}/popular?api_key=${this.key}`
        )
        .then((response) => {
          this.popular = response.data.results;
        });
    },
    async getFilms() {
      for (let i = 0; i < this.filmSlickArr.length; i++) {
        await axios
          .get(
            `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmSlickArr[i]}?api_key=${this.key}`
          )
          .then((response) => {
            this.type1.push(response.data.results);
          });
      }
    },
    switchType(type) {
      this.filmType = type;
      if (type === "tv") {
        this.genres = this.$store.state.TVShowGenres;
        this.filmSlickArr = this.tvshowSlickArr;
      } else if (type === "movie") {
        this.genres = this.$store.state.MovieGenres;
        this.filmSlickArr = this.movieSlickArr;
      }
    },
  },
};
</script>

<style scoped>
.home {
  background: var(--main-bg);
}
.home__buttons {
  display: flex;
  justify-content: center;
}
.home__switch-button {
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
  cursor: pointer;
  display: block;
  font-family: "Alegreya Sans", sans-serif;
  font-weight: bold;
  letter-spacing: 0.4rem;
  outline: none;
  width: 300px;
  height: 80px;
  margin: 0 10px;
  text-transform: uppercase;
}
</style>
