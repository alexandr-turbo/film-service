<template>
  <div class="film">
    <div v-if="currentfilm && cast && trailers">
      <div class="film__poster-container">
        <img
          v-if="currentfilm.backdrop_path"
          class="film__poster"
          :src="`${globalImgAddress}1280${currentfilm.backdrop_path}`"
        />
      </div>
      <div class="container">
        <div v-if="genres && genres.length">{{'film-genres' | localize}}: {{ genres }}</div>
        <div v-if="currentfilm.overview">
          <div>{{'film-summary' | localize}}</div>
          <div>{{ currentfilm.overview }}</div>
        </div>
        <div v-if="cast.length">
          <SlickTemplate :cast="cast" />
        </div>
        <div v-if="trailers.length">
          <FilmTrailersSlickTemplate :trailers="trailers" />
        </div>
        <div class="film__title" v-if="reviews && reviews.length">
          {{'film-reviews' | localize}}
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
import FilmTrailersSlickTemplate from "../components/FilmTrailersSlickTemplate.vue";
import FilmReviewTemplate from "../components/FilmReviewTemplate.vue";
export default {
  data() {
    return {
      key: process.env.VUE_APP_MOVIEDB,
      genres: '',
      currentfilm: {},
      cast: [],
      trailers: [],
      reviews: [],
      isvisible: true,
      loc: ''
    };
  },
  components: {
    SlickTemplate,
    FilmTrailersSlickTemplate,
    FilmReviewTemplate,
  },
  props: ["filmID", "filmType"],
  methods: {
    // met() {
    //   this.loc = localStorage.getItem('locale')
    // }
    async changeLocale() {
      this.$root.loading = true
      this.loc = this.$store.state.locale.locale
      this.currentfilm = {}
      let p1 = await this.getCurrentFilm()
      this.genres = ''
      this.getGenres()
      this.cast = []
      let p2 = this.getCast()
      this.trailers = []
      let p3 = this.getTrailers()
      this.reviews = []
      let p4 = this.getReviews()
      Promise.all([p1, p2, p3, p4]).then(this.$root.loading = false)
    },
    async getCurrentFilm() {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}?api_key=${this.key}&language=${this.loc}`
        )
        .then((response) => {
          this.currentfilm = response.data;
        });
    },
    getGenres() {
      this.genres = this.currentfilm.genres.map((el) => el.name).join("/");
    },
    async getCast() {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}/credits?api_key=${this.key}&language=${this.loc}`
        )
        .then((response) => {
          this.cast = response.data.cast;
          for (let i = 0; i < this.cast.length; i++) {
            axios
              .get(
                `${this.globalAPIMovieDBAddress}/3/person/${this.cast[i].id}?api_key=${this.key}&language=${this.loc}`
              )
              .then((response) => {
                this.$set(this.cast[i], 'bio', response.data.biography)
              });
          }
        });
    },
    async getTrailers() {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}/videos?api_key=${this.key}&language=${this.loc}`
        )
        .then((response) => {
          this.trailers = response.data.results;
        });
    },
    async getReviews() {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}/reviews?api_key=${this.key}&language=${this.loc}`
        )
        .then((response) => {
          this.reviews = response.data.results;
        });
    }
  },
  watch: {
    '$store.state.locale.locale'() {
      // this.loc = this.$store.state.locale.locale
      this.changeLocale()
    },
  },
  async created() {
    this.loc = this.$store.state.locale.locale
    let p1 = await this.getCurrentFilm()
    this.getGenres()
    let p2 = await this.getCast()
    let p3 = await this.getTrailers()
    let p4 = await this.getReviews()
    Promise.all([p1, p2, p3, p4]).then(this.$root.loading = false)
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
</style>
