<template>
  <div class="film">
    <div v-if="currentfilm && cast && trailers">
      <div class="ss"
      >
        <img
          v-if="currentfilm.backdrop_path"
          class="upper-imgs"
          :src="`${globalImgAddress}1280${currentfilm.backdrop_path}`"
        />
      </div>
      <div class="container">
        <div>Genres: {{ genres }}</div>
        <div v-if="currentfilm.overview">
          <div class="uppercase">summary</div>
          <div>{{ currentfilm.overview }}</div>
        </div>
        <div v-if="cast.length">
          <FilmActorsSlickTemplate :cast="cast" />
        </div>
        <div v-if="trailers.length">
          <FilmTrailersSlickTemplate :trailers="trailers" />
        </div>
        <div v-if="reviews && reviews.lenght">
          Reviews
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
  created() {
    axios
      .get(
        `https://api.themoviedb.org/3/${this.filmType}/${this.filmID}?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.currentfilm = response.data;
        this.genres = this.currentfilm.genres.map((el) => el.name).join("/");
      });
    axios
      .get(
        `https://api.themoviedb.org/3/${this.filmType}/${this.filmID}/credits?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.cast = response.data.cast;
        for (let i = 0; i < this.cast.length; i++) {
          axios
            .get(
              `https://api.themoviedb.org/3/person/${this.cast[i].id}?api_key=f943d3d10cc39fd734122d69efabbacb`
            )
            .then((response) => {
              this.cast[i].bio = response.data.biography;
            });
        }
      });
    axios
      .get(
        `https://api.themoviedb.org/3/${this.filmType}/${this.filmID}/videos?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.trailers = response.data.results;
      });
    axios
      .get(
        `https://api.themoviedb.org/3/${this.filmType}/${this.filmID}/reviews?api_key=f943d3d10cc39fd734122d69efabbacb&language=en-US`
      )
      .then((response) => {
        this.reviews = response.data.results;
      });
  },
};
</script>

<style scoped>
.ss {
  overflow: hidden;
  max-height: calc(100vh - 80px);
  max-width: 100vw;
}
.film {
  background: -webkit-linear-gradient(285deg, #251431 0%, #161130 22%);
  background: -o-linear-gradient(285deg, #251431 0%, #161130 22%);
  background: linear-gradient(165deg, #251431 0%, #161130 22%);
  color: #fff;
}
.upper-imgs {
  /* margin: 0;
  padding: 0; */
  height: 100%;
  width: 100%;
}
.uppercase {
  text-transform: uppercase;
}
.left-text {
  text-align: left;
}
.upper-text {
  text-align: left;
  margin-left: 100px;
  margin-top: -350px;
  padding-bottom: 50px;
}
.white-text {
  color: white;
}
/* .container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
} */
.actor-image {
  border-radius: 5px;
  height: 190px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
.iframe {
  text-align: center;
}
.actor-name,
.trailer-name {
  text-align: center;
}
.uppercase {
  text-transform: uppercase;
}
.left-text {
  text-align: left;
}
</style>
