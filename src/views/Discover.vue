<template>
  <div class="discover">
    <div class="container">
      <form @submit.prevent="searchRequest">
        <div class="discover__form">
          <div class="discover__form-field-container">
            <div>Media type</div>
            <select class="discover__form-field" v-model="media_type">
              <option
                v-for="mediatype in mediatypeOptions"
                :value="mediatype.value"
                :key="mediatype.value"
                >{{ mediatype.title }}</option
              >
            </select>
          </div>
          <div class="discover__form-field-container">
            <div>Sort</div>
            <select class="discover__form-field" v-model="sortType">
              <option
                v-for="sort in sortOptions"
                :value="sort.value"
                :key="sort.value"
                >{{ sort.title }}</option
              >
            </select>
          </div>
          <div class="discover__form-field-container">
            <div>Min average vote</div>
            <input
              class="discover__form-field"
              type="number"
              v-model="vote"
              placeholder="min average vote"
            />
          </div>
          <div
            v-if="media_type === 'movie'"
            class="discover__form-field-container"
          >
            <div>Involved actor</div>
            <autocomplete
              v-if="!a"
              :search="search"
              :get-result-value="getResultValue"
              @submit="onSubmit"
              auto-select
            />
            <input
              v-else-if="a"
              class="discover__form-field"
              :value="a"
              @focus="a = null"
            />
          </div>
          <div class="discover__form-field-container">
            <div>Genre</div>
            <select class="discover__form-field" v-model="genre">
              <option value=""></option>
              <option
                v-for="genre in genres"
                :key="genre.id"
                >{{ genre.name }}</option
              >
            </select>
          </div>
          <div class="discover__form-field-container">
            <div>
              {{ media_type === "movie" ? "Year" : "First airing date" }}
            </div>
            <input
              class="discover__form-field"
              type="number"
              v-model="year"
              placeholder="year"
            />
          </div>
        </div>
        <div class="discover__form-button-container">
          <button class="discover__form-button" type="submit">submit</button>
        </div>
      </form>
      <div class="discover__results" v-if="searchResultPage.total_results">
        <div
          class="discover__result"
          v-for="item in searchResultPage.results"
          :key="item.id"
        >
          <DiscoverCoverTemplate :item="item" />
        </div>
      </div>
      <div class="discover__results-title" v-else>
        Nothing found
      </div>
      <div v-if="searchResultPage.page" class="discover__page-buttons">
        <button
          class="discover__page-button discover__page-button--previous"
          v-if="searchResultPage.page > 1"
          @click="getPreviousPageSearchResults()"
        >
          Previous page
        </button>
        <button
          class="discover__page-button discover__page-button--next"
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
import DiscoverCoverTemplate from "../components/DiscoverCoverTemplate.vue";
import Autocomplete from "@trevoreyre/autocomplete-vue";

export default {
  data() {
    return {
      movieSortOptions: [
        { title: "Popularity descending", value: "popularity.desc" },
        { title: "Popularity ascending", value: "popularity.asc" },
        { title: "Release date descending", value: "release_date.desc" },
        { title: "Release date ascending", value: "release_date.asc" },
        { title: "Revenue descending", value: "revenue.desc" },
        { title: "Revenue ascending", value: "revenue.asc" },
        { title: "Vote average descending", value: "vote_average.desc" },
        { title: "Vote average ascending", value: "vote_average.asc" },
      ],
      tvSortOptions: [
        { title: "Popularity descending", value: "popularity.desc" },
        { title: "Popularity ascending", value: "popularity.asc" },
        { title: "First air date descending", value: "first_air_date.desc" },
        { title: "First air date ascending", value: "first_air_date.asc" },
        { title: "Vote average descending", value: "vote_average.desc" },
        { title: "Vote average ascending", value: "vote_average.asc" },
      ],
      mediatypeOptions: [
        { title: "Movie", value: "movie" },
        { title: "TVShow", value: "tv" },
      ],
      year: "",
      genre: "",
      people: "",
      vote: "",
      sortType: "",
      media_type: "",
      searchResultPage: {},
      movieGenres: null,
      tvshowGenres: null,
      searchQuery: "",
      pageNumber: "",
      fullPath: "",
      selectedActorFromList: "",
      selectedGenre: "",
      selectedGenreID: "",
      selectedActor: "",
      selectedVote: "",
      routeMediatype: "",
      routeSortBy: "",
      routeVote: "",
      routeActor: "",
      routeGenreID: "",
      routeYear: "",
      routePage: "",
      key: process.env.VUE_APP_MOVIEDB,
      a: "",
    };
  },
  components: {
    DiscoverCoverTemplate,
    Autocomplete,
  },
  computed: {
    genres() {
      return this.media_type === "movie" ? this.movieGenres : this.tvshowGenres;
    },
    sortOptions() {
      return this.media_type === "movie"
        ? this.movieSortOptions
        : this.tvSortOptions;
    },
  },
  watch: {
    sortType() {
      console.log(this.sortType)
    },
    genre() {
      console.log(this.genre)
    },
    media_type() {
      this.genre = this.routeGenreID = this.selectedGenreID = this.a = this.selectedActorFromList = this.routeActor = "";
      this.routeSortBy = this.sortType = "popularity.desc";
      // this.a = this.selectedActorFromList = this.routeActor = "";
      // this.routeSortBy = this.sortType = "popularity.desc";
    },
    $route() {
      this.getRoutePaths();
      this.getPageSearchResults(
        this.routeMediatype,
        this.routeSortBy,
        this.routeVote,
        this.routeActor,
        this.routeGenreID,
        this.routeYear,
        this.routePage
      );
    },
  },
  async created() {
    this.getRoutePaths();
    this.media_type = this.routeMediatype
    // console.log(this.media_type)
    this.vote = this.routeVote;
    this.year = this.routeYear;
    this.sortType = this.routeSortBy;
    // console.log(this.sortType)
    
    this.getPageSearchResults(
      this.routeMediatype,
      this.routeSortBy,
      this.routeVote,
      this.routeActor,
      this.routeGenreID,
      this.routeYear,
      this.routePage
    );
    this.movieGenres = this.$store.state.MovieGenres;
    this.tvshowGenres = this.$store.state.TVShowGenres;
    if (this.routeGenreID) {
      this.selectedGenre = this.genres.find(
        (name) => name.id === +this.routeGenreID
      );
      // console.log(this.selectedGenre.name)
      this.genre = this.selectedGenre.name;
    }
    if (this.routeActor) {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/person/${this.routeActor}?api_key=${this.key}&language=en-US`
        )
        .then((response) => {
          this.a = response.data.name;
        });
    }
    // console.log(this.sortType)
  },
  methods: {
    getRoutePaths() {
      let a = this.$route.fullPath.split("?")[1];
      let b = a.split("&");
      this.routeMediatype = b[0].split("=")[1];
      // console.log(this.routeMediatype)
      this.routeSortBy = b[1].split("=")[1];
      // console.log(this.routeSortBy)
      this.routeVote = b[2].split("=")[1];
      if (this.routeMediatype === "movie") {
        this.routeActor = b[3].split("=")[1];
        this.routeGenreID = b[4].split("=")[1];
        this.routeYear = b[5].split("=")[1];
      } else if (this.routeMediatype === "tv") {
        this.routeActor = "";
        this.routeGenreID = b[3].split("=")[1];
        this.routeYear = b[4].split("=")[1];
      }
      this.routePage = b[b.length - 1].split("=")[1];
    },
    async search(input) {
      if (input.length < 1) {
        this.selectedActorFromList = "";
        return [];
      }
      let a = [];
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/search/person?api_key=${this.key}&language=en-US&query=${input}&include_adult=false&page=1`
        )
        .then((response) => {
          a = response.data.results;
          a.filter((actor) => {
            return actor.name.toLowerCase().includes(input.toLowerCase());
          });
        });
      this.$root.loading = false;
      return a;
    },
    getResultValue(result) {
      return result.name;
    },
    onSubmit(result) {
      if (result) {
        this.selectedActorFromList = result.id;
      }
    },
    searchRequest() {
      // this.selectedGenreID = "&with_genres=";
      if (this.genre) {
        this.selectedGenre = this.genres.find(
          (name) => name.name === this.genre
        );
        this.selectedGenreID = this.selectedGenre.id;
      } else if (!this.genre) {
        this.selectedGenreID = "";
      }
      if (this.media_type === "tv") {
        this.selectedActor = "";
      }
      if (this.selectedActorFromList) {
        this.selectedActor = this.selectedActorFromList;
      }
      if (this.media_type === "movie") {
        this.$router.push(
          `${this.$route.path}?mediatype=${this.media_type}&sort_by=${this.sortType}&vote_average.gte=${this.vote}&with_people=${this.selectedActor}&with_genres=${this.selectedGenreID}&year=${this.year}&page=1`
        );
      } else if (this.media_type === "tv") {
        this.$router.push(
          `${this.$route.path}?mediatype=${this.media_type}&sort_by=${this.sortType}&vote_average.gte=${this.vote}&with_genres=${this.selectedGenreID}&first_air_date_year=${this.year}&page=1`
        );
      }
    },
    async getPageSearchResults(
      routeMediatype,
      routeSortBy,
      routeVote,
      routeActor,
      routeGenreID,
      routeYear,
      routePage
    ) {
      if (routeMediatype === "movie") {
        await axios
          .get(
            `${this.globalAPIMovieDBAddress}/3/discover/${routeMediatype}?api_key=${this.key}&language=en-US&sort_by=${routeSortBy}&include_adult=false&include_video=false&vote_average.gte=${routeVote}&with_people=${routeActor}&with_genres=${routeGenreID}&year=${routeYear}&page=${routePage}`
          )
          .then((response) => {
            this.searchResultPage = response.data;
            if(this.searchResultPage.results.length) {
              for (let i = 0; i < this.searchResultPage.results.length; i++) {
                // this.searchResultPage.results[i].media_type = routeMediatype;
                this.$set(this.searchResultPage.results[i], 'media_type', routeMediatype)
                // this.searchResultPage.results[i] = Object.assign({}, this.searchResultPage.results[i], { media_type: routeMediatype })
              }
            }
          });
      } else if (routeMediatype === "tv") {
        await axios
          .get(
            `${this.globalAPIMovieDBAddress}/3/discover/${routeMediatype}?api_key=${this.key}&language=en-US&sort_by=${routeSortBy}&include_adult=false&include_video=false&vote_average.gte=${routeVote}&with_genres=${routeGenreID}&first_air_date_year=${routeYear}&page=${routePage}`
          )
          .then((response) => {
            this.searchResultPage = response.data;
            if(this.searchResultPage.results.length) {
              for (let i = 0; i < this.searchResultPage.results.length; i++) {
                // this.searchResultPage.results[i].media_type = routeMediatype;
                this.$set(this.searchResultPage.results[i], 'media_type', routeMediatype)
                // this.searchResultPage.results[i] = Object.assign({}, this.searchResultPage.results[i], { media_type: routeMediatype })
              }
            }
          });
      }
      this.$root.loading = false;
    },
    getNextPageSearchResults() {
      this.fullPath = this.$route.fullPath.split("page=")[0];
      this.pageNumber = ++this.$route.fullPath.split("page=")[1];
      this.$router.push(`${this.fullPath}&page=${this.pageNumber}`);
    },
    getPreviousPageSearchResults() {
      this.fullPath = this.$route.fullPath.split("page=")[0];
      this.pageNumber = --this.$route.fullPath.split("page=")[1];
      this.$router.push(`${this.fullPath}&page=${this.pageNumber}`);
    },
  },
};
</script>
<style scoped>
.discover {
  background: var(--main-bg);
}
.discover__form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
@media (min-width: 640px) {
  .discover__form-field-container {
    display: flex;
    flex-direction: column;
    width: 150px;
    margin: 10px;
  }
}
@media (min-width: 480px) and (max-width: 639px) {
  .discover__form-field-container {
    display: flex;
    flex-direction: column;
    width: 170px;
    margin: 10px;
  }
}
@media (max-width: 479px) {
  .discover__form-field-container {
    display: flex;
    flex-direction: column;
    width: 280px;
    margin: 10px;
  }
}
.discover__form-field {
  outline: none;
  border: none;
  margin-top: 1px;
}
.discover__form-button-container {
  display: flex;
  justify-content: center;
}
.discover__form-button,
.discover__page-button {
  background: none;
  border: 2px solid var(--main-text-color);
  border-radius: 20px;
  cursor: pointer;
  font-family: "Alegreya Sans", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  margin: 2rem auto;
  outline: none;
  padding: 0.7rem;
  width: 180px;
}
.discover__results {
  display: flex;
  flex-wrap: wrap;
}
.discover__result {
    display: flex;
    flex-direction: column;
    height: auto;
  }
@media (min-width: 1280px) {
  .discover__result {
    width: 20%;
  }
}
@media (min-width: 1024px) and (max-width: 1279px) {
  .discover__result {
    width: 25%;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .discover__result {
    width: 33%;
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .discover__result {
    width: 50%;
  }
}
@media (max-width: 479px) {
  .discover__result {
    width: 100%;
  }
}
.discover__results-title {
  display: flex;
  justify-content: center;
}
.discover__page-buttons {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}
.discover__page-button--previous::before {
  content: "<<";
}
.discover__page-button--next::after {
  content: ">>";
}
</style>
