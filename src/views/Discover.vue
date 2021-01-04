<template>
  <div class="discover">
    <div class="container">
      <form @submit.prevent="searchRequest">
        <div class="discover__form">
          <div class="discover__form-field-container">
            <div>Media type</div>
            <select class="discover__form-field" v-model="mediatype">
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
          <div class="discover__form-field-container">
            <div>Involved actor</div>
            <autocomplete
              :search="search"
              :get-result-value="getResultValue"
              @submit="onSubmit"
              auto-select
            />
          </div>
          <div class="discover__form-field-container">
            <div>Genre</div>
            <select class="discover__form-field" v-model="genre">
              <option value=""></option>
              <option v-for="genre in genres" :key="genre.id">{{ genre.name }}</option>
            </select>
          </div>
          <div class="discover__form-field-container">
            <div>Year</div>
            <input class="discover__form-field" type="number" v-model="year" placeholder="year" />
          </div>
        </div>
        <div class="discover__form-button-container">
          <button class="discover__form-button" type="submit">submit</button>
        </div>
      </form>
      <div class="discover__results" v-if="searchResultPage.total_results">
        <div
          class="discover__result"
          v-for="film in searchResultPage.results"
          :key="film.id"
        >
          <DiscoverCoverTemplate :film="film" :filmType="mediatype" />
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
      sortOptions: [
        { title: "Popularity descending", value: "&sort_by=popularity.desc" },
        { title: "Popularity ascending", value: "&sort_by=popularity.asc" },
        {
          title: "Release date descending",
          value: "&sort_by=release_date.desc",
        },
        { title: "Release date ascending", value: "&sort_by=release_date.asc" },
        { title: "Revenue descending", value: "&sort_by=revenue.desc" },
        { title: "Revenue ascending", value: "&sort_by=revenue.asc" },
        {
          title: "Vote average descending",
          value: "&sort_by=vote_average.desc",
        },
        { title: "Vote average ascending", value: "&sort_by=vote_average.asc" },
      ],
      mediatypeOptions: [
        { title: "Movie", value: "movie" },
        { title: "TVShow", value: "tv" },
      ],
      year: "",
      genre: "",
      people: "",
      vote: "",
      sortType: "&sort_by=popularity.desc",
      mediatype: "movie",
      searchResultPage: {},
      filteredSearchResults: {},
      movieGenres: null,
      tvshowGenres: null,
      searchQuery: "",
      pageNumber: "",
      fullPath: "",
      selectedActorFromList: "",
      selectedYear: "&year=",
      selectedGenreID: "",
      selectedGenreIDString: "&with_genres=",
      selectedActor: "&with_people=",
      selectedVote: "&vote_average.gte=",
      routeMediatype: '',
      routeSortBy: '',
      routeVote: '',
      routeActor: '',
      routeGenre: '',
      routeYear: '',
      page: '',
      key: process.env.VUE_APP_MOVIEDB,
    };
  },
  components: {
    DiscoverCoverTemplate,
    Autocomplete,
  },
  computed: {
    genres() {
      return this.mediatype === "movie" ? this.movieGenres : this.tvshowGenres;
    },
  },
  watch: {
    mediatype() {
      this.genre = "";
    },
    $route() {
      this.getRoutePaths()
      this.getPageSearchResults(
        this.routeMediatype,
        this.routeSortBy,
        this.routeVote,
        this.routeActor,
        this.routeGenre,
        this.routeYear,
        this.page
      );
    },
  },
  created() {
    this.getRoutePaths()
    this.getPageSearchResults(
      this.routeMediatype,
      this.routeSortBy,
      this.routeVote,
      this.routeActor,
      this.routeGenre,
      this.routeYear,
      this.page
    );
    this.movieGenres = this.$store.state.MovieGenres;
    this.tvshowGenres = this.$store.state.TVShowGenres;
  },
  methods: {
    getRoutePaths() {
      this.routeMediatype = this.$route.fullPath.split("?")[1].split("&")[0];
      this.routeSortBy = this.$route.fullPath.split("?")[1].split("&")[1];
      this.routeVote = this.$route.fullPath.split("?")[1].split("&")[2];
      this.routeActor = this.$route.fullPath.split("?")[1].split("&")[3];
      this.routeGenre = this.$route.fullPath.split("?")[1].split("&")[4];
      this.routeYear = this.$route.fullPath.split("?")[1].split("&")[5];
      this.page = this.$route.fullPath.split("page=")[1];
      console.log(this.routeMediatype + ' ' + this.routeSortBy + ' ' + this.routeVote + ' ' + this.routeActor + ' ' + this.routeGenre + ' ' + this.routeYear + ' ' + this.page)
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
      this.$root.loading = false
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
      this.selectedYear = "&year=";
      this.selectedGenreIDString = "&with_genres=";
      this.selectedActor = "&with_people=";
      this.selectedVote = "&vote_average.gte=";
      if (this.year) {
        this.selectedYear += this.year;
      }
      if (this.genre) {
        this.selectedGenreID = this.genres.find(
          (name) => name.name === this.genre
        );
        this.selectedGenreIDString += this.selectedGenreID.id;
      }
      if (this.selectedActorFromList) {
        this.selectedActor += this.selectedActorFromList;
      }
      if (this.vote) {
        this.selectedVote += this.vote;
      }
      console.log(this.mediatype)
      this.$router.push(
        `${this.$route.path}?${this.mediatype}${this.sortType}${this.selectedVote}${this.selectedActor}${this.selectedGenreIDString}${this.selectedYear}&page=1`
      );
    },
    async getPageSearchResults(
      routeMediatype,
      routeSortBy,
      routeVote,
      routeActor,
      routeGenre,
      routeYear,
      page
    ) {
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/discover/${routeMediatype}?api_key=${this.key}&language=en-US&include_adult=false&include_video=false&${routeActor}&page=${page}`
        )
        .then((response) => {
          this.searchResultPage = response.data;
          console.log(this.searchResultPage)
        });
      this.$root.loading = false
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
/* @import '../../public/style.css'; */
.discover {
  background: var(--main-bg);
  /* color: var(--main-text-color); */
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
/* @media (max-width: 1279px) {
  .discover__form-field-container {
    display: flex;
    flex-direction: column;
    width: 150px;
  }
} */

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
  -webkit-transition: background 0.5s;
  -o-transition: background 0.5s;
  transition: background 0.5s;
  width: 180px;
}
.discover__results {
  display: flex;
  flex-wrap: wrap;
}
@media (min-width: 1280px) {
  .discover__result {
    display: flex;
    flex-direction: column;
    width: 20%;
    height: auto;
  }
}
@media (min-width: 1024px) and (max-width: 1279px) {
  .discover__result {
    display: flex;
    flex-direction: column;
    width: 25%;
    height: auto;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .discover__result {
    display: flex;
    flex-direction: column;
    width: 33%;
    height: auto;
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .discover__result {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: auto;
  }
}
@media (max-width: 479px) {
  .discover__result {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
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
