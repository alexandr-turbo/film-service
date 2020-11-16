<template>
  <div>
    <router-link
      tag="div"
      :to="{
        name: 'movie',
        params: { movieID: movie.id, movieType: movie.media_type },
      }"
    >
      <img
        v-if="movie.poster_path && movie.poster_path !== ''"
        class="movie-image"
        :src="`https://image.tmdb.org/t/p/w1280${movie.poster_path}`"
      />
      <img v-else class="movie-image" src="../../public/no-image.png" />
      <div v-if="movie.title && movie.title !== ''" class="movie-title">
        {{ movie.title }}
      </div>
      <div
        v-else-if="movie.original_title && movie.original_title !== ''"
        class="movie-title"
      >
        {{ movie.original_title }}
      </div>
      <div v-else class="movie-title">
        DB thinks that search keyword is included
      </div>
      <div
        v-if="movie.genre_ids && movie.genre_ids !== ''"
        class="movie-title"
      >
        {{
          movie.media_type === "movie"
            ? getCurrentMediaTypeGenresNames(movieGenres, movie.genre_ids)
            : getCurrentMediaTypeGenresNames(tvshowGenres, movie.genre_ids)
        }}
      </div>
      <div v-else class="movie-title">Genres are not provided</div>
    </router-link>
  </div>
</template>
<script>
// import axios from "axios";
import movieGenresMixin from "@/mixins/movieGenresMixin";

export default {
  // data() {
  //   return {
  //     searchResultPage: {},
  //     filteredSearchResults: {},
  //     movieGenres: null,
  //     tvshowGenres: null,
  //   };
  // },
  props: ["movie", "movieGenres", "tvshowGenres"],
  mixins: [movieGenresMixin],
  // watch: {
  //   $route() {
  //     let newRoute = this.$route.fullPath.split("?")[1].split("&")[0];
  //     let newPage = this.$route.fullPath.split("=")[1];
  //     this.getFirstPageSearchResults(newRoute, newPage);
  //   },
  // },
  // async created() {
    // let newRoute = this.$route.fullPath.split("?")[1].split("&")[0];
    // let newPage = this.$route.fullPath.split("=")[1];
    // this.getFirstPageSearchResults(newRoute, newPage);
    // this.movieGenres = await this.getCurrentMediaTypeGenres("movie");
    // console.log(this.movieGenres)
    // this.tvshowGenres = await this.getCurrentMediaTypeGenres("tv");
    // console.log(this.tvshowGenres)
    // this.movieGenres = this.$store.state.MovieGenres
    // this.tvshowGenres = this.$store.state.TVShowGenres
  // },
  // methods: {
  //   getFirstPageSearchResults(query, page) {
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${query}&page=${page}&include_adult=false`
  //       )
  //       .then((response) => {
  //         this.searchResultPage = response.data;
  //       });
  //   },
  //   getNextPageSearchResults() {
  //     let newRoute = this.$route.fullPath.split("?")[1].split("&")[0];
  //     let newPage = ++this.$route.fullPath.split("=")[1];
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${newRoute}&page=${newPage}&include_adult=false`
  //       )
  //       .then((response) => {
  //         this.searchResultPage = response.data;
  //         this.$router.push(`${this.$route.path}?${newRoute}&page=${newPage}`);
  //       });
  //   },
  //   getPreviousPageSearchResults() {
  //     let newRoute = this.$route.fullPath.split("?")[1].split("&")[0];
  //     let newPage = --this.$route.fullPath.split("=")[1];
  //     axios
  //       .get(
  //         `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${newRoute}&page=${newPage}&include_adult=false`
  //       )
  //       .then((response) => {
  //         this.searchResultPage = response.data;
  //         // page === 1 ? this.$router.push(`${this.$route.path}?${query}`) : this.$router.push(`${this.$route.path}?${query}&page=${page}`)
  //         this.$router.push(`${this.$route.path}?${newRoute}&page=${newPage}`);
  //       });
  //   },
  // },
};
</script>
<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}
.flex-col {
  display: flex;
  flex-direction: column;
  width: 20%;
  height: auto;
}
.movie-image {
  object-fit: fill;
  border-radius: 5px;
  width: 80%;
  /* height: auto; */
  height: 246px;
  margin: 36px auto 12px;
}
.movie-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
}
.center {
  display: flex;
  justify-content: center;
}
.mt {
  margin-top: 36px;
}
</style>
