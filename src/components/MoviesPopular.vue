<template id="movies-popular-template">
  <div class="container" v-if="popular != null && genres != null">
    <h3 class="uppercase left-text">
      popular
    </h3>
    <slick class="slick" ref="slick" :options="slickOptions">
      <div v-for="item in popular" :key="item.id">
        <router-link
          tag="button"
          class="button"
          :to="{
            name: 'movie',
            params: {
              movieID: item.id,
              movieType: 'movie',
            },
          }"
        >
          <img
            class="main-imgs"
            :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`"
          />
        </router-link>
        <h4>
          {{ item.original_title }}
        </h4>
        <h5>
          {{ getMovieGenres(genres, item.genre_ids) }}
        </h5>
      </div>
    </slick>
  </div>
</template>

<script>
import axios from "axios";
import Slick from "vue-slick";
import movieGenresMixin from '@/mixins/movieGenresMixin';

export default {
  data() {
    return {
      popular: null,
      genres: null,
      slickOptions: {
        slidesToShow: 7,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 500,
      },
    };
  },
  mixins: [movieGenresMixin],
  created() {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=f943d3d10cc39fd734122d69efabbacb"
      )
      .then((response) => {
        this.popular = response.data.results;
      }),
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=f943d3d10cc39fd734122d69efabbacb"
        )
        .then((response) => {
          this.genres = response.data.genres;
        });
  },
  components: {
    Slick,
  },
  methods: {
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },
    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$refs.slick.reSlick();
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
}
img.main-imgs {
  border-radius: 5px;
  height: 190px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
.uppercase {
  text-transform: uppercase;
}
.left-text {
  text-align: left;
}
</style>
