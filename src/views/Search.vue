<template>
  <div class="search">
    <div class="search__container">
      <div class="search__results-title" v-if="searchResultPage.page">
        Search results for {{ searchQuery | replaceDashToSpace }}
      </div>
      <div class="search__results" v-if="searchResultPage.total_results">
        <div
          class="search__result"
          v-for="film in searchResultPage.results"
          :key="film.id"
        >
          <SearchCoverTemplate
            :film="film"
            :genres="
              film.media_type === 'movie' ? movieGenres : tvshowGenres
            "
          />
        </div>
      </div>
      <div class="search__results-title" v-else>
        Nothing found
      </div>
      <div v-if="searchResultPage.page" class="search__page-buttons">
        <button
          class="search__page-button search__page-button--previous"
          v-if="searchResultPage.page > 1"
          @click="getPreviousPageSearchResults()"
        >
          Previous page
        </button>
        <button
          class="search__page-button search__page-button--next"
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
import SearchCoverTemplate from "../components/SearchCoverTemplate.vue";

export default {
  data() {
    return {
      searchResultPage: {},
      filteredSearchResults: {},
      movieGenres: null,
      tvshowGenres: null,
      genres: [],
      searchQuery: "",
      pageNumber: "",
      key: process.env.VUE_APP_MOVIEDB
    };
  },
  components: {
    SearchCoverTemplate,
  },
  watch: {
    $route() {
      if (
        (this.$route.fullPath.indexOf("?") !== -1) &
        (this.searchResultPage.page !== 0)
      ) {
        this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
        this.pageNumber = this.$route.fullPath.split("=")[1];
        this.getPageSearchResults(this.searchQuery, this.pageNumber);
      } else {
        this.searchResultPage.page = 0;
      }
    },
  },
  async created() {
    if (this.$route.fullPath.indexOf("?") !== -1) {
      this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
      this.pageNumber = this.$route.fullPath.split("=")[1];
      this.getPageSearchResults(this.searchQuery, this.pageNumber);
    }
    this.movieGenres = this.$store.state.MovieGenres;
    this.tvshowGenres = this.$store.state.TVShowGenres;
  },
  methods: {
    getPageSearchResults(query, page) {
      axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/search/multi?api_key=${this.key}&query=${query}&page=${page}&include_adult=false`
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
          `${this.globalAPIMovieDBAddress}/3/search/multi?api_key=${this.key}&query=${this.searchQuery}&page=${this.pageNumber}&include_adult=false`
        )
        .then((response) => {
          this.searchResultPage = response.data;
          this.$router.push(
            `${this.$route.path}?${this.searchQuery}&page=${this.pageNumber}`
          );
        });
    },
    getPreviousPageSearchResults() {
      this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
      this.pageNumber = --this.$route.fullPath.split("=")[1];
      axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/search/multi?api_key=${this.key}&query=${this.searchQuery}&page=${this.pageNumber}&include_adult=false`
        )
        .then((response) => {
          this.searchResultPage = response.data;
          this.$router.push(
            `${this.$route.path}?${this.searchQuery}&page=${this.pageNumber}`
          );
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
.search__container {
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 80%;
}
@media (max-width: 479px) {
  .search__container {
    max-width: 90%;
  }
}
.search__results-title {
  text-align: center;
}
.search__results {
  display: flex;
  flex-wrap: wrap;
}
@media (min-width: 1280px) {
  .search__result {
    display: flex;
    flex-direction: column;
    width: 20%;
    height: auto;
  }
}
@media (min-width: 1024px) and (max-width: 1279px) {
  .search__result {
    display: flex;
    flex-direction: column;
    width: 25%;
    height: auto;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .search__result {
    display: flex;
    flex-direction: column;
    width: 33%;
    height: auto;
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .search__result {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: auto;
  }
}
@media (max-width: 479px) {
  .search__result {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
  }
}
.search__page-buttons {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}
.search__page-button {
  background: none;
  border: 2px solid #fff;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-family: "Alegreya Sans", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  margin: 2rem auto;
  outline: none;
  padding: 0.7rem;
  -webkit-transition: background 0.5s;
  -o-transition: background 0.5s;
  transition: background 0.5s;
  width: 180px;
}
.search__page-button--previous::before {
  content: "<<";
}
.search__page-button--next::after {
  content: ">>";
}
</style>
