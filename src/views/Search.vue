<template>
  <div class="search">
    <div class="container">
      <div class="prettytext" v-if="searchResultPage.page">Search results for {{ searchQuery }}
        <div class="flex" v-if="searchResultPage.total_results">
          <div class="flex-col" v-for="movie in searchResultPage.results" :key="movie.id">
            <SearchCover :movie="movie" :movieGenres="movieGenres" :tvshowGenres="tvshowGenres"/>
          </div>
        </div>
      </div>
      <div class="center" v-else>
        Nothing found
      </div>
      <div v-if="searchResultPage.page" class="center mt">
        <button
          class="submit before"
          v-if="searchResultPage.page > 1"
          @click="getPreviousPageSearchResults()"
        >
          Previous page
        </button>
        <button
          class="submit after"
          v-if="searchResultPage.page < searchResultPage.total_pages"
          @click="getNextPageSearchResults()"
        >
          Next page
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
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
  watch: {
    $route() {
      if (this.$route.fullPath.indexOf("?") !== -1 & this.searchResultPage.page !== 0) {
        this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
        this.pageNumber = this.$route.fullPath.split("=")[1];
        this.getFirstPageSearchResults(this.searchQuery, this.pageNumber);
      } else {
        this.searchResultPage.page = 0
      }
    },
  },
  async created() {
    if (this.$route.fullPath.indexOf("?") !== -1) {
      this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
      this.pageNumber = this.$route.fullPath.split("=")[1];
      this.getFirstPageSearchResults(this.searchQuery, this.pageNumber);
    }
    this.movieGenres = this.$store.state.MovieGenres
    this.tvshowGenres = this.$store.state.TVShowGenres
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
          this.$router.push(`${this.$route.path}?${this.searchQuery}&page=${this.pageNumber}`);
        });
    },
  },
};
</script>
<style scoped>
.search {
  background: -webkit-linear-gradient(285deg, #251431 0%, #161130 22%);
    background: -o-linear-gradient(285deg, #251431 0%, #161130 22%);
    background: linear-gradient(165deg, #251431 0%, #161130 22%);
    color: white;
}
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
.prettytext {
  text-align: center;
}
.submit {
  background: none;
  border: 2px solid #fff;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-family: "Alegreya Sans", sans-serif;
  font-size: 1.1rem;
  letter-spacing: .1rem;
  margin: 2rem auto;
  outline: none;
  padding: .7rem;
  -webkit-transition: background .5s;
  -o-transition: background .5s;
  transition: background .5s;
  width: 180px;
}
.sdf {
  display: flex;
  justify-content: center;
}
.before::before {
  content: "<<";
}
.after::after {
  content: ">>";
}
</style>
