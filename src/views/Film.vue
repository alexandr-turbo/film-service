<template>
  <div class="film">
    <div v-if="currentFilm && cast && trailers">
      <div class="film__poster-container">
        <img
          v-if="currentFilm.backdrop_path"
          class="film__poster"
          :src="`${globalImgAddress}1280${currentFilm.backdrop_path}`"
        />
      </div>
      <div class="container">
        <div v-if="genres && genres.length">
          {{ "film-genres" | localize }}: {{ genres }}
        </div>
        <div v-if="currentFilm.overview">
          <div>{{ "film-summary" | localize }}</div>
          <div>{{ currentFilm.overview }}</div>
        </div>
        <div v-if="cast.length">
          <SlickTemplate :cast="cast" />
        </div>
        <div v-if="trailers.length">
          <div class="film-trailers-slick-template__title">
            {{ "film-trailers-slick-template-trailers" | localize }}
          </div>
          <div v-for="trailer in trailers" :key="trailer.id">
            <iframe
              :width="iFrameWidth"
              :height="(iFrameWidth / 16) * 9"
              :src="`https://www.youtube.com/embed/${trailer.key}`"
            ></iframe>
            <div class="film-trailer-cover-template__trailer-title">
              {{ trailer.name }}
            </div>
          </div>
        </div>
        <div class="film__title" v-if="reviews && reviews.length">
          {{ "film-reviews" | localize }}
        </div>
        <div v-for="(review, index) in reviews" :key="review.id">
          <FilmReviewTemplate :review="review" :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SlickTemplate from "../components/SlickTemplate.vue";
import FilmReviewTemplate from "../components/FilmReviewTemplate.vue";
export default {
  data() {
    return {
      key: process.env.VUE_APP_MOVIEDB,
      genres: "",
      currentFilm: {},
      cast: [],
      trailers: [],
      reviews: [],
      locale: "",
      windowWidth: 0,
      iFrameWidth: 0,
    };
  },
  components: {
    SlickTemplate,
    FilmReviewTemplate,
  },
  props: ["filmID", "filmType"],
  methods: {
    async changeLocale() {
      this.$root.loading = true;
      this.locale = this.$store.getters.locale;
      this.currentFilm = {};
      let p1 = await this.getCurrentFilm();
      this.genres = "";
      this.getGenres();
      this.cast = [];
      let p2 = this.getCast();
      this.trailers = [];
      let p3 = this.getTrailers();
      this.reviews = [];
      let p4 = this.getReviews();
      Promise.all([p1, p2, p3, p4]).then((this.$root.loading = false));
    },
    async getCurrentFilm() {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}?api_key=${this.key}&language=${this.locale}`
        )
        .then((response) => {
          this.currentFilm = response.data;
        });
    },
    getGenres() {
      this.genres = this.currentFilm.genres
        .map((genre) => genre.name)
        .join("/");
    },
    async getCast() {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}/credits?api_key=${this.key}&language=${this.locale}`
        )
        .then((response) => {
          this.cast = response.data.cast;
          for (let i = 0; i < this.cast.length; i++) {
            axios
              .get(
                `${this.globalAPIMovieDBAddress}/3/person/${this.cast[i].id}?api_key=${this.key}&language=${this.locale}`
              )
              .then((response) => {
                this.$set(this.cast[i], "bio", response.data.biography);
              });
          }
        });
    },
    async getTrailers() {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}/videos?api_key=${this.key}&language=${this.locale}`
        )
        .then((response) => {
          this.trailers = response.data.results;
        });
    },
    async getReviews() {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}/reviews?api_key=${this.key}&language=${this.locale}`
        )
        .then((response) => {
          this.reviews = response.data.results;
        });
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
      console.log(this.windowWidth);
      this.windowWidth > 479
        ? (this.iFrameWidth = this.windowWidth * 0.8)
        : (this.iFrameWidth = this.windowWidth * 0.9);
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  watch: {
    "$store.getters.locale"() {
      this.changeLocale();
    },
  },
  async mounted() {
    this.locale = this.$store.getters.locale;
    let p1 = await this.getCurrentFilm();
    this.getGenres();
    let p2 = await this.getCast();
    let p3 = await this.getTrailers();
    let p4 = await this.getReviews();
    Promise.all([p1, p2, p3, p4]).then((this.$root.loading = false));
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      this.getWindowWidth();
    });
  },
};
</script>

<style scoped>
.film {
  background: var(--main-bg);
}
.film__poster-container {
  overflow: hidden;
  max-height: calc(100vh - 80px);
  max-width: 100vw;
}
.film__poster {
  height: 100%;
  width: 100%;
}
.film__title {
  margin-top: 50px;
  text-transform: uppercase;
}
@media (max-width: 539px) {
  .film__title {
    text-align: center;
  }
}
.film-trailers-slick-template__title {
  margin-top: 50px;
  margin-bottom: 20px;
  text-transform: uppercase;
}
@media (max-width: 539px) {
  .film-trailers-slick-template__title {
    text-align: center;
    margin-bottom: 20px;
  }
}
.film-trailer-cover-template__trailer-title {
  text-align: center;
  margin: 10px auto 50px;
}
</style>
