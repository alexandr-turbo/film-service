<template id="tvshows-airing-today-template">
  <div class="container" v-if="airing_today != null && genres != null">
    <h3 class="uppercase left-text">
      airing today
    </h3>
    <slick class="slick" ref="slick" :options="slickOptions">
      <div v-for="item in airing_today" :key="item.id">
        <router-link
          tag="button"
          class="button"
          :to="{
            name: 'movie',
            params: {
              movieID: item.id,
              movieType: 'tv',
            },
          }"
        >
          <img
            class="main-imgs"
            :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`"
          />
        </router-link>
        <div>
          {{ item.original_name }}
        </div>
        <div>
          {{ getMovieGenres(genres, item.genre_ids) }}
        </div>
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
      airing_today: null,
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
        "https://api.themoviedb.org/3/tv/airing_today?api_key=f943d3d10cc39fd734122d69efabbacb"
      )
      .then((response) => {
        this.airing_today = response.data.results;
      }),
      axios
        .get(
          "https://api.themoviedb.org/3/genre/tv/list?api_key=f943d3d10cc39fd734122d69efabbacb"
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
</style>
