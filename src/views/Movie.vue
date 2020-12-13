<template id="about-movie-template">
  <div class="movie">
    <div
      v-if="
        currentmovie &&
          cast &&
          trailers
      "
    >
      <img
        v-if="currentmovie.backdrop_path"
        class="upper-imgs"
        :src="`${globalImgAddress}1280${currentmovie.backdrop_path}`"
      />
      <div class="container">
        <div>
          Genres: {{genres}}
        </div>
        <div v-if="currentmovie.overview">
          <div class="uppercase left-text">summary</div>
          <div>{{ currentmovie.overview }}</div>
        </div>
        <div v-if="cast.length">
          <FilmActorsSlick :cast="cast" />
        </div>
        <div v-if="trailers.length">
          <FilmTrailersSlick :trailers="trailers" />
        </div>
        <div v-for="(review, index) in reviews" :key="review.id">
          <Review :review="review"  :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FilmActorsSlick from "../components/FilmActorsSlick.vue";
import FilmTrailersSlick from "../components/FilmTrailersSlick.vue";
import Review from "../components/Review.vue";
export default {
  data() {
    return {
      genres: null,
      currentmovie: null,
      cast: null,
      trailers: null,
      reviews: null,
      isvisible: true
    };
  },
  components: {
    FilmActorsSlick,
    FilmTrailersSlick,
    Review
  },
  props: ["movieID", "movieType"],
  created() {
    axios
      .get(
        `https://api.themoviedb.org/3/${this.movieType}/${this.movieID}?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.currentmovie = response.data;
        this.genres = this.currentmovie.genres.map(el => el.name).join('/')
      })
    axios
      .get(
        `https://api.themoviedb.org/3/${this.movieType}/${this.movieID}/credits?api_key=f943d3d10cc39fd734122d69efabbacb`
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
            })
        }
      })
    axios
      .get(
        `https://api.themoviedb.org/3/${this.movieType}/${this.movieID}/videos?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.trailers = response.data.results;
      })
    axios
      .get(
        `https://api.themoviedb.org/3/${this.movieType}/${this.movieID}/reviews?api_key=f943d3d10cc39fd734122d69efabbacb&language=en-US`
      )
      .then((response) => {
        this.reviews = response.data.results;
      })
  },
};
</script>

<style scoped>
.movie {
  background: -webkit-linear-gradient(285deg, #251431 0%, #161130 22%);
    background: -o-linear-gradient(285deg, #251431 0%, #161130 22%);
    background: linear-gradient(165deg, #251431 0%, #161130 22%);
    color: #fff;
}
.preloader {
  width: 100%;
  height: 100%;
  background: red;
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
.container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
}
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
