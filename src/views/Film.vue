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
        <div>Genres: {{ genres }}</div>
        <div v-if="currentfilm.overview">
          <div>SUMMARY</div>
          <div>{{ currentfilm.overview }}</div>
        </div>
        <div v-if="cast.length">
          <FilmActorsSlickTemplate :cast="cast" />
        </div>
        <div v-if="trailers.length">
          <FilmTrailersSlickTemplate :trailers="trailers" />
        </div>
        <div class="film__title" v-if="reviews && reviews.length">
          REVIEWS
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
import FilmActorsSlickTemplate from "../components/FilmActorsSlickTemplate.vue";
import FilmTrailersSlickTemplate from "../components/FilmTrailersSlickTemplate.vue";
import FilmReviewTemplate from "../components/FilmReviewTemplate.vue";
export default {
  data() {
    return {
      key: process.env.VUE_APP_MOVIEDB,
      genres: null,
      currentfilm: null,
      cast: null,
      trailers: null,
      reviews: null,
      isvisible: true,
    };
  },
  components: {
    FilmActorsSlickTemplate,
    FilmTrailersSlickTemplate,
    FilmReviewTemplate,
  },
  props: ["filmID", "filmType"],
  async created() {
    let p1 = await axios
      .get(
        `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}?api_key=${this.key}`
      )
      .then((response) => {
        this.currentfilm = response.data;
        this.genres = this.currentfilm.genres.map((el) => el.name).join("/");
      });
    let p2 = await axios
      .get(
        `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}/credits?api_key=${this.key}`
      )
      .then((response) => {
        this.cast = response.data.cast;
        for (let i = 0; i < this.cast.length; i++) {
          axios
            .get(
              `${this.globalAPIMovieDBAddress}/3/person/${this.cast[i].id}?api_key=${this.key}`
            )
            .then((response) => {
              this.cast[i].bio = response.data.biography;
            });
        }
      });
    let p3 = await axios
      .get(
        `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}/videos?api_key=${this.key}`
      )
      .then((response) => {
        this.trailers = response.data.results;
      });
    let p4 = await axios
      .get(
        `${this.globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmID}/reviews?api_key=${this.key}&language=en-US`
      )
      .then((response) => {
        this.reviews = response.data.results;
      });
    Promise.all([p1, p2, p3, p4]).then(this.$root.loading = false)
  },
};
</script>

<style scoped>
/* @import '../../public/style.css'; */
.film {
  background: var(--main-bg);
  /* color: var(--main-text-color); */
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
