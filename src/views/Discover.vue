<template>
  <div class="discover">
    <div class="container">
      <form @submit.prevent="searchRequest">
        <div class="flex2">
          <div class="flexcol">
            <div>Media type</div>
            <select v-model="mediatype">
              <option
                v-for="s in mediatypeOptions"
                :value="s.value"
                :key="s.value"
                >{{ s.title }}</option
              >
            </select>
          </div>
          <div class="flexcol">
            <div>Sort</div>
            <select v-model="sortType">
              <option
                v-for="s in sortOptions"
                :value="s.value"
                :key="s.value"
                >{{ s.title }}</option
              >
            </select>
          </div>
          <div class="flexcol">
            <div>Min average vote</div>
            <input
              type="number"
              v-model="vote"
              placeholder="min average vote"
            />
          </div>
          <div class="flexcol">
            <div>Type involved actor</div>
            <autocomplete
              :search="search"
              :get-result-value="getResultValue"
              @submit="onSubmit"
              auto-select
            />
          </div>
          <div class="flexcol">
            <div>Genre</div>
            <select v-model="genre">
              <option value=""></option>
              <option v-for="g in genres" :key="g.id">{{ g.name }}</option>
            </select>
          </div>
          <div class="flexcol">
            <div>Year</div>
            <input type="number" v-model="year" placeholder="year" />
          </div>
        </div>
        <div class="sdf">
          <button class="submit" type="submit">submit</button>
        </div>
      </form>
      <div class="flex" v-if="searchResultPage.total_results">
        <div
          class="flex-col"
          v-for="film in searchResultPage.results"
          :key="film.id"
        >
          <DiscoverCoverTemplate :film="film" :filmType="mediatype" />
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
      animals: ["first animal", "second animal"],
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
      page: ''
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
    },
    async search(input) {
      if (input.length < 1) {
        this.selectedActorFromList = "";
        return [];
      }
      let a = [];
      await axios
        .get(
          `https://api.themoviedb.org/3/search/person?api_key=f943d3d10cc39fd734122d69efabbacb&language=en-US&query=${input}&include_adult=false&page=1`
        )
        .then((response) => {
          a = response.data.results;
          a.filter((actor) => {
            return actor.name.toLowerCase().includes(input.toLowerCase());
          });
        });
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
      this.$router.push(
        `${this.$route.path}?${this.mediatype}${this.sortType}${this.selectedVote}${this.selectedActor}${this.selectedGenreIDString}${this.selectedYear}&page=1`
      );
    },
    getPageSearchResults(
      routeMediatype,
      routeSortBy,
      routeVote,
      routeActor,
      routeGenre,
      routeYear,
      page
    ) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/${routeMediatype}?api_key=12a5356516535d4d67654a936a088c1b&language=en-US&${routeSortBy}&include_adult=false&include_video=false&${routeVote}&${routeActor}&${routeGenre}&${routeYear}&page=${page}`
        )
        .then((response) => {
          this.searchResultPage = response.data;
        });
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
  color: #fff;
  background-color: #111617;
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
.film-image {
  object-fit: fill;
  border-radius: 5px;
  width: 80%;
  height: 246px;
  margin: 36px auto 12px;
}
.film-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
/* .container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
} */
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
.flex2 {
  display: flex;
  justify-content: space-between;
}
.flexcol {
  display: flex;
  flex-direction: column;
}
.submit {
  background: none;
  border: 2px solid #fff;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  font-family: "Alegreya Sans", sans-serif;
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  margin: 2rem auto;
  outline: none;
  padding: 0.7rem;
  -webkit-transition: background 0.5s;
  -o-transition: background 0.5s;
  transition: background 0.5s;
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
