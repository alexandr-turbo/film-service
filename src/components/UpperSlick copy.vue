<template id="upper-slick-template">
  <div class="upper-slick" v-if="popular.length">
    <slick class="slick" ref="slick" :options="slickOptionsUpper">
      <div v-for="item in popular" v-bind:key="item.id">
        <router-link
          :to="{ name: 'movie', params: { movieID: item.id, movieType: movieType } }"
        >
          <img
            class="upper-imgs"
            :src="`${globalImgAddress}1280${item.backdrop_path}`"
          />
        </router-link>
        <div class="upper-text white-text">
          <h3 class="uppercase">popular</h3>
          <h4 v-if="movieType === 'movie'">{{ item.original_title }}</h4>
          <h4 v-if="movieType === 'tv'">{{ item.original_name }}</h4>
          <h5>{{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}</h5>
        </div>
      </div>
    </slick>
  </div>
</template>

<script>
import axios from "axios";
import Slick from "vue-slick";
// import movieGenresMixin from "@/mixins/movieGenresMixin";

export default {
  data() {
    return {
      popular: [],
      genres: [],
      slickOptionsUpper: {
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        draggable: false,
      },
    };
  },
  props: ['movieType'],
  // mixins: [movieGenresMixin],
  async created() {
    console.log(this.movieType)
    await axios
      .get(
        `https://api.themoviedb.org/3/${this.movieType}/popular?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.popular = response.data.results;
        console.log(this.popular);
      }),
    // this.tvshowGenres = await this.getCurrentMediaTypeGenres("tv");
    this.movieType === 'movie' ? this.genres = await this.$store.state.MovieGenres : this.genres = await this.$store.state.TVShowGenres;
    console.log(this.genres);
  },
  watch: {
    async movieType() {
      console.log(this.movieType)
      await axios
        .get(
          `https://api.themoviedb.org/3/${this.movieType}/popular?api_key=f943d3d10cc39fd734122d69efabbacb`
        )
        .then((response) => {
          // this.popular = []
          this.popular = response.data.results;
          console.log(this.popular);
        }),
      // this.tvshowGenres = await this.getCurrentMediaTypeGenres("tv");
      this.movieType === 'movie' ? this.genres = await this.$store.state.MovieGenres : this.genres = await this.$store.state.TVShowGenres;
      // this.reInit()
      console.log(this.genres);
    }
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
<style scoped>
/* img.upper-imgs {
  margin: 0;
  padding: 0;
  height: auto;
  width: 100vw;
} */
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
</style>
