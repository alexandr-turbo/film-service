<template>
  <div class="discover">
    <div class="container">
      <form @submit.prevent="searchRequest">
        <div class="discover__form">
          <div class="discover__form-field-container">
            <div>{{ "discover-mediatype" | localize }}</div>
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
            <div>{{ "discover-sort" | localize }}</div>
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
            <div>{{ "discover-min-average-vote" | localize }}</div>
            <input
              class="discover__form-field"
              type="number"
              v-model="vote"
              :placeholder="minAverageVotePlaceholder"
            />
          </div>
          <div
            v-if="media_type === 'movie'"
            class="discover__form-field-container"
          >
            <div>{{ "discover-involved-actor" | localize }}</div>
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
            <div>{{ "discover-genre" | localize }}</div>
            <select class="discover__form-field" v-model="genre">
              <option value=""></option>
              <option v-for="genre in genres" :key="genre.id">{{
                genre.name
              }}</option>
            </select>
          </div>
          <div class="discover__form-field-container">
            <div>
              {{
                media_type === "movie"
                  ? "discover-year"
                  : "discover-first-airing-date" | localize
              }}
            </div>
            <input
              class="discover__form-field"
              type="number"
              v-model="year"
              :placeholder="yearPlaceholder"
            />
          </div>
        </div>
        <div class="discover__form-button-container">
          <button class="discover__form-button" type="submit">
            {{ "discover-submit" | localize }}
          </button>
        </div>
      </form>
      <div class="discover__results" v-if="searchResultPage.total_results">
        <div
          class="discover__result"
          v-for="item in searchResultPage.results"
          :key="item.id"
        >
          <CoverTemplate1 :item="item" />
        </div>
      </div>
      <div class="discover__results-title" v-else>
        {{ "discover-nothing-found" | localize }}
      </div>
      <div v-if="searchResultPage.page" class="discover__page-buttons">
        <button
          class="discover__page-button discover__page-button--previous"
          v-if="searchResultPage.page > 1"
          @click="getPreviousPageSearchResults()"
        >
          {{ "discover-previous" | localize }}
        </button>
        <button
          class="discover__page-button discover__page-button--next"
          v-if="searchResultPage.page < searchResultPage.total_pages"
          @click="getNextPageSearchResults()"
        >
          {{ "discover-next" | localize }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import CoverTemplate1 from "../components/CoverTemplate1.vue";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import localize from "@/filters/localize";

export default {
  data() {
    return {
      movieSortOptions: [],
      tvSortOptions: [],
      mediatypeOptions: [],
      minAverageVotePlaceholder: "",
      yearPlaceholder: "",
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
      preventOnCreatedUpdate: true,
      loc: "",
      b: "",
      c: "",
      arr2: []
    };
  },
  components: {
    CoverTemplate1,
    Autocomplete,
  },
  computed: {
    // isMovieQueryCorrect() {
    //   return (
    //     Object.keys(this.$route.query).includes("mediatype") &&
    //     Object.keys(this.$route.query).includes("sort_by") &&
    //     Object.keys(this.$route.query).includes("vote_average") &&
    //     Object.keys(this.$route.query).includes("with_people") &&
    //     Object.keys(this.$route.query).includes("with_genres") &&
    //     Object.keys(this.$route.query).includes("year") &&
    //     Object.keys(this.$route.query).includes("page") &&
    //     this.$route.query.mediatype === "movie"
    //   );
    // },
    // isTVQueryCorrect() {
    //   return (
    //     Object.keys(this.$route.query).includes("mediatype") &&
    //     Object.keys(this.$route.query).includes("sort_by") &&
    //     Object.keys(this.$route.query).includes("vote_average") &&
    //     Object.keys(this.$route.query).includes("with_genres") &&
    //     Object.keys(this.$route.query).includes("first_air_date_year") &&
    //     Object.keys(this.$route.query).includes("page") &&
    //     this.$route.query.mediatype === "tv"
    //   );
    // },
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
    media_type() {
      if (this.preventOnCreatedUpdate) {
        this.preventOnCreatedUpdate = false;
        return;
      }
      this.genre = this.routeGenreID = this.selectedGenreID = "";
      this.a = this.selectedActorFromList = this.routeActor = "";
      this.routeSortBy = this.sortType = "popularity.desc";
    },
    $route() {
      if (this.isTrue()) {
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
      } else {
        this.searchResultPage = {};
        this.$root.loading = false;
      }
    },
    "$store.state.locale.locale"() {
      this.changeLocale();
    },
  },
  async created() {
    this.loc = this.$store.state.locale.locale;
    this.yearPlaceholder = localize("discover-year");
    this.minAverageVotePlaceholder = localize("discover-min-average-vote");
    this.mediatypeOptions = [
      { title: localize("discover-mediatype-movie"), value: "movie" },
      { title: localize("discover-mediatype-tvshow"), value: "tv" },
    ];
    this.movieSortOptions = [
      {
        title: localize("discover-popularity-descending"),
        value: "popularity.desc",
      },
      {
        title: localize("discover-popularity-ascending"),
        value: "popularity.asc",
      },
      {
        title: localize("discover-release-date-ascending"),
        value: "release_date.desc",
      },
      {
        title: localize("discover-release-date-ascending"),
        value: "release_date.asc",
      },
      { title: localize("discover-revenue-ascending"), value: "revenue.desc" },
      { title: localize("discover-revenue-ascending"), value: "revenue.asc" },
      {
        title: localize("discover-vote-average-ascending"),
        value: "vote_average.desc",
      },
      {
        title: localize("discover-vote-average-ascending"),
        value: "vote_average.asc",
      },
    ];
    this.tvSortOptions = [
      {
        title: localize("discover-popularity-descending"),
        value: "popularity.desc",
      },
      {
        title: localize("discover-popularity-ascending"),
        value: "popularity.asc",
      },
      {
        title: localize("discover-first-air-date-ascending"),
        value: "first_air_date.desc",
      },
      {
        title: localize("discover-first-air-date-ascending"),
        value: "first_air_date.asc",
      },
      {
        title: localize("discover-vote-average-ascending"),
        value: "vote_average.desc",
      },
      {
        title: localize("discover-vote-average-ascending"),
        value: "vote_average.asc",
      },
    ];
    if (this.isTrue()) {
      this.getRoutePaths();
      this.media_type = this.routeMediatype;
      this.vote = this.routeVote;
      this.year = this.routeYear;
      this.sortType = this.routeSortBy;
      this.getPageSearchResults(
        this.routeMediatype,
        this.routeSortBy,
        this.routeVote,
        this.routeActor,
        this.routeGenreID,
        this.routeYear,
        this.routePage
      );

      this.movieGenres = this.$store.state.genres.MovieGenres;
      this.tvshowGenres = this.$store.state.genres.TVShowGenres;
      if (this.routeGenreID) {
        this.selectedGenre = this.genres.find(
          (name) => name.id === +this.routeGenreID
        );
        this.genre = this.selectedGenre.name;
      }
      if (this.routeActor) {
        await axios
          .get(
            `${this.globalAPIMovieDBAddress}/3/person/${this.routeActor}?api_key=${this.key}&&language=${this.loc}`
          )
          .then((response) => {
            this.a = response.data.name;
          });
      }
    } else {
      this.searchResultPage = {};
      this.$root.loading = false;
    }
  },
  methods: {
    isTrue(){
      let arr = Object.keys(this.$route.query)
      if(this.$route.query.mediatype && this.$route.query.mediatype === "movie") {
        this.arr2 = ["mediatype", "page", "sort_by", "vote_average", "with_genres", "with_people", "year"]
        return this.arr2.every(i => arr.includes(i)) && this.movieSortOptions.some(i => i.value === this.$route.query.sort_by) && this.$route.query.page;
      } else if(this.$route.query.mediatype && this.$route.query.mediatype === "tv") {
        this.arr2 = ["mediatype", "page", "sort_by", "vote_average", "with_genres", "first_air_date_year"]
        return this.arr2.every(i => arr.includes(i)) && this.tvSortOptions.some(i => i.value === this.$route.query.sort_by) && this.$route.query.page;
      }
    },

    async changeLocale() {
      this.loc = this.$store.state.locale.locale;
      this.yearPlaceholder = localize("discover-year");
      this.minAverageVotePlaceholder = localize("discover-min-average-vote");
      this.mediatypeOptions = [
        { title: localize("discover-mediatype-movie"), value: "movie" },
        { title: localize("discover-mediatype-tvshow"), value: "tv" },
      ];
      this.movieSortOptions = [
        {
          title: localize("discover-popularity-descending"),
          value: "popularity.desc",
        },
        {
          title: localize("discover-popularity-ascending"),
          value: "popularity.asc",
        },
        {
          title: localize("discover-release-date-ascending"),
          value: "release_date.desc",
        },
        {
          title: localize("discover-release-date-ascending"),
          value: "release_date.asc",
        },
        {
          title: localize("discover-revenue-ascending"),
          value: "revenue.desc",
        },
        { title: localize("discover-revenue-ascending"), value: "revenue.asc" },
        {
          title: localize("discover-vote-average-ascending"),
          value: "vote_average.desc",
        },
        {
          title: localize("discover-vote-average-ascending"),
          value: "vote_average.asc",
        },
      ];
      this.tvSortOptions = [
        {
          title: localize("discover-popularity-descending"),
          value: "popularity.desc",
        },
        {
          title: localize("discover-popularity-ascending"),
          value: "popularity.asc",
        },
        {
          title: localize("discover-first-air-date-ascending"),
          value: "first_air_date.desc",
        },
        {
          title: localize("discover-first-air-date-ascending"),
          value: "first_air_date.asc",
        },
        {
          title: localize("discover-vote-average-ascending"),
          value: "vote_average.desc",
        },
        {
          title: localize("discover-vote-average-ascending"),
          value: "vote_average.asc",
        },
      ];
      this.b = "";
      this.c = "";
      this.getRoutePaths();
      this.media_type = "";
      this.media_type = this.routeMediatype;
      this.vote = "";
      this.vote = this.routeVote;
      this.year = "";
      this.year = this.routeYear;
      this.sortType = "";
      this.sortType = this.routeSortBy;
      this.routeGenreID = "";
      this.routeActor = "";
      this.getPageSearchResults(
        this.routeMediatype,
        this.routeSortBy,
        this.routeVote,
        this.routeActor,
        this.routeGenreID,
        this.routeYear,
        this.routePage
      );
      await this.$store.dispatch("loadMovieGenres");
      this.movieGenres = this.$store.state.genres.MovieGenres;
      await this.$store.dispatch("loadTVShowsGenres");
      this.tvshowGenres = this.$store.state.genres.TVShowGenres;
      if (this.routeGenreID) {
        this.selectedGenre = this.genres.find(
          (name) => name.id === +this.routeGenreID
        );
        this.genre = this.selectedGenre.name;
      }
      if (this.routeActor) {
        await axios
          .get(
            `${this.globalAPIMovieDBAddress}/3/person/${this.routeActor}?api_key=${this.key}&&language=${this.loc}`
          )
          .then((response) => {
            this.a = response.data.name;
          });
      }
    },
    getFullPath() {
      this.fullPath = this.$route.fullPath.split("page=")[0];
    },
    increasePageNumber() {
      // this.pageNumber = ++this.$route.fullPath.split("page=")[1];
      this.pageNumber = this.$route.query.page;
      this.pageNumber++;
    },
    decreasePageNumber() {
      // this.pageNumber = --this.$route.fullPath.split("page=")[1];
      this.pageNumber = this.$route.query.page;
      this.pageNumbe--;
    },
    getRoutePaths() {
      // this.b = this.$route.fullPath.split("?")[1];)
      // this.c = this.b.split("&");
      // this.routeMediatype = this.c[0].split("=")[1];
      // this.routeSortBy = this.c[1].split("=")[1];
      // this.routeVote = this.c[2].split("=")[1];
      // if (this.routeMediatype === "movie") {
      //   this.routeActor = this.c[3].split("=")[1];
      //   this.routeGenreID = this.c[4].split("=")[1];
      //   this.routeYear = this.c[5].split("=")[1];
      // } else if (this.routeMediatype === "tv") {
      //   this.routeActor = "";
      //   this.routeGenreID = this.c[3].split("=")[1];
      //   this.routeYear = this.c[4].split("=")[1];
      // }
      // this.routePage = this.c[this.c.length - 1].split("=")[1];
      this.routeMediatype = this.$route.query.mediatype;
      this.routeSortBy = this.$route.query.sort_by;
      this.routeVote = this.$route.query.vote_average;
      this.routeActor = this.$route.query.with_people;
      this.routeGenreID = this.$route.query.with_genres;
      this.routeYear =
        this.routeMediatype === "movie"
          ? this.$route.query.year
          : this.$route.query.first_air_date_year;
      this.routePage = this.$route.query.page;
    },
    async search(input) {
      if (input.length < 1) {
        this.selectedActorFromList = "";
        return [];
      }
      let a = [];
      await axios
        .get(
          `${this.globalAPIMovieDBAddress}/3/search/person?api_key=${this.key}&language=${this.loc}&query=${input}&include_adult=false&page=1`
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
          `${this.$route.path}?mediatype=${this.media_type}&sort_by=${this.sortType}&vote_average=${this.vote}&with_people=${this.selectedActor}&with_genres=${this.selectedGenreID}&year=${this.year}&page=1`
        );
      } else if (this.media_type === "tv") {
        this.$router.push(
          `${this.$route.path}?mediatype=${this.media_type}&sort_by=${this.sortType}&vote_average=${this.vote}&with_genres=${this.selectedGenreID}&first_air_date_year=${this.year}&page=1`
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
            `${this.globalAPIMovieDBAddress}/3/discover/${routeMediatype}?api_key=${this.key}&language=${this.loc}&sort_by=${routeSortBy}&include_adult=false&include_video=false&vote_average.gte=${routeVote}&with_people=${routeActor}&with_genres=${routeGenreID}&year=${routeYear}&page=${routePage}`
          )
          .then((response) => {
            this.searchResultPage = response.data;
            if (this.searchResultPage.results.length) {
              for (let i = 0; i < this.searchResultPage.results.length; i++) {
                this.$set(
                  this.searchResultPage.results[i],
                  "media_type",
                  routeMediatype
                );
              }
            }
          });
      } else if (routeMediatype === "tv") {
        await axios
          .get(
            `${this.globalAPIMovieDBAddress}/3/discover/${routeMediatype}?api_key=${this.key}&language=${this.loc}&sort_by=${routeSortBy}&include_adult=false&include_video=false&vote_average.gte=${routeVote}&with_genres=${routeGenreID}&first_air_date_year=${routeYear}&page=${routePage}`
          )
          .then((response) => {
            this.searchResultPage = response.data;
            if (this.searchResultPage.results.length) {
              for (let i = 0; i < this.searchResultPage.results.length; i++) {
                this.$set(
                  this.searchResultPage.results[i],
                  "media_type",
                  routeMediatype
                );
              }
            }
          });
      }
      this.$root.loading = false;
    },
    getNextPageSearchResults() {
      this.getFullPath();
      this.increasePageNumber();
      this.$router.push(`${this.fullPath}&page=${this.pageNumber}`);
    },
    getPreviousPageSearchResults() {
      this.getFullPath();
      this.decreasePageNumber();
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
.discover__form-field-container {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
@media (min-width: 640px) {
  .discover__form-field-container {
    width: 150px;
  }
}
@media (min-width: 480px) and (max-width: 639px) {
  .discover__form-field-container {
    width: 170px;
  }
}
@media (max-width: 479px) {
  .discover__form-field-container {
    width: 280px;
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
