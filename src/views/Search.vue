<template>
  <div class="container">
    <div class="prettytext">Search results for {{ searchQuery }} </div>
    <div class="flex" v-if="searchResultPage.total_results">
      <div class="flex-col" v-for="movie in searchResultPage.results" :key="movie.id">
        <SearchCover :movie="movie" :movieGenres="movieGenres" :tvshowGenres="tvshowGenres"/>
      </div>
      <!-- <router-link
        tag="div"
        class="flex-col"
        v-for="movie in searchResultPage.results"
        :key="movie.id"
        :to="{
          name: 'movie',
          params: { movieID: movie.id, movieType: movie.media_type },
        }"
      >
        <img
          v-if="movie.poster_path && movie.poster_path !== ''"
          class="movie-image"
          :src="`${globalImgAddress}1280${movie.poster_path}`"
        />
        <img v-else class="movie-image" src="@/assets/no-image.png" />
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
      </router-link> -->
    </div>
    <div class="center" v-else>
      Nothing found
    </div>
    <div v-if="searchResultPage.page" class="center mt">
      <!-- <div class="test"> -->
        <button
          class="pretty"
          v-if="searchResultPage.page > 1"
          @click="getPreviousPageSearchResults()"
        >
          Previous page
        </button>
      <!-- </div> -->
      <!-- <div class="test"> -->
        <button
          class="pretty"
          v-if="searchResultPage.page < searchResultPage.total_pages"
          @click="getNextPageSearchResults()"
        >
          Next page
        </button>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
// import movieGenresMixin from "@/mixins/movieGenresMixin";
import SearchCover from "../components/SearchCover.vue";

export default {
  data() {
    return {
      searchResultPage: {},
      filteredSearchResults: {},
      movieGenres: null,
      tvshowGenres: null,
      searchQuery: '',
      pageNumber: ''
    };
  },
  components: {
    SearchCover
  },
  // // mixins: [movieGenresMixin],
  watch: {
    $route() {
      this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
      this.pageNumber = this.$route.fullPath.split("=")[1];
      this.getFirstPageSearchResults(this.searchQuery, this.pageNumber);
      // this.searchQuery = this.searchQuery
    },
  },
  async created() {
    this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
    this.pageNumber = this.$route.fullPath.split("=")[1];
    this.getFirstPageSearchResults(this.searchQuery, this.pageNumber);
    // this.movieGenres = await this.getCurrentMediaTypeGenres("movie");
    // console.log(this.movieGenres)
    // this.tvshowGenres = await this.getCurrentMediaTypeGenres("tv");
    // console.log(this.tvshowGenres)
    this.movieGenres = this.$store.state.MovieGenres
    this.tvshowGenres = this.$store.state.TVShowGenres
    // console.log(this.$route.fullPath.split("?")[1].split("&")[0])
    // this.searchQuery = this.searchQuery
  },
  methods: {
    getFirstPageSearchResults(query, page) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${query}&page=${page}&include_adult=false`
        )
        .then((response) => {
          this.searchResultPage = response.data;
        });
    },
    getNextPageSearchResults() {
      this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
      this.pageNumber = ++this.$route.fullPath.split("=")[1];
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${this.searchQuery}&page=${this.pageNumber}&include_adult=false`
        )
        .then((response) => {
          this.searchResultPage = response.data;
          this.$router.push(`${this.$route.path}?${this.searchQuery}&page=${this.pageNumber}`);
        });
    },
    getPreviousPageSearchResults() {
      this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
      this.pageNumber = --this.$route.fullPath.split("=")[1];
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${this.searchQuery}&page=${this.pageNumber}&include_adult=false`
        )
        .then((response) => {
          this.searchResultPage = response.data;
          // page === 1 ? this.$router.push(`${this.$route.path}?${query}`) : this.$router.push(`${this.$route.path}?${query}&page=${page}`)
          this.$router.push(`${this.$route.path}?${this.searchQuery}&page=${this.pageNumber}`);
        });
    },
  },
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
.test {
  position: relative;
}
/* .pretty:after {
  content: "";
  width: 0;
  height: 0;
  display: block;
  border-top: 20px solid #187dbc;
  border-bottom: 20px solid #187dbc;
  border-left: 12px solid transparent;
  border-right: 20px solid #187dbc;
  position: absolute;
  opacity: 0.6; 
  right: 10px;
  top: 0;
  border-radius: 0 12px 12px 0; 
} */
.prettytext {
  text-align: center;
}
</style>
