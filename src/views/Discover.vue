<template>
  <div class="dicover">
    <div class="container">
      <form @submit.prevent="searchRequest">
        <div class="flex2">
          <div class="flexcol">
            <div>Media type</div>
            <select v-model="mediatype">
              <!-- <option>movie</option>
              <option>tv</option> -->
              <option v-for="s in mediatypeOptions" :value="s.value" :key="s.value">{{s.title}}</option>
            </select>
          </div>
          <div class="flexcol">
            <div>Sort</div>
            <select v-model="sort">
              <!-- <option>&sort_by=popularity.desc</option>
              <option>&sort_by=popularity.asc</option>
              <option>&sort_by=release_date.desc</option>
              <option>&sort_by=release_date.asc</option>
              <option>&sort_by=revenue.desc</option>
              <option>&sort_by=revenue.asc</option>
              <option>&sort_by=vote_average.desc</option>
              <option>&sort_by=vote_average.asc</option> -->
              <option v-for="s in sortOptions" :value="s.value" :key="s.value">{{s.title}}</option>
            </select>
          </div>
          <div class="flexcol">
            <div>Min average vote</div>
            <input type="number" v-model="vote" placeholder="min average vote">
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
              <option v-for="g in genres" :key="g.id">{{g.name}}</option>
            </select>
          </div>
          <div class="flexcol">
            <div>Year</div>
            <input type="number" v-model="year" placeholder="year">
          </div>
        </div>
        <button type="submit">submit</button>
      </form>
      <div class="flex" v-if="searchResultPage.total_results">
        <div class="flex-col" v-for="movie in searchResultPage.results" :key="movie.id">
          <DiscoverCover :movie="movie" :movieType="mediatype" />
        </div>
      </div>
    <div class="center" v-else>
      Nothing found
    </div>
    <div v-if="searchResultPage.page" class="center mt">
        <button
          class="pretty"
          v-if="searchResultPage.page > 1"
          @click="getPreviousPageSearchResults()"
        >
          Previous page
        </button>
        <button
          class="pretty"
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
import DiscoverCover from "../components/DiscoverCover.vue";
import Autocomplete from '@trevoreyre/autocomplete-vue'

export default {
  data() {
    return {
      sortOptions: [
        {title: 'Popularity descending', value: '&sort_by=popularity.desc'},
        {title: 'Popularity ascending', value: '&sort_by=popularity.asc'},
        {title: 'Release date descending', value: '&sort_by=release_date.desc'},
        {title: 'Release date ascending', value: '&sort_by=release_date.asc'},
        {title: 'Revenue descending', value: '&sort_by=revenue.desc'},
        {title: 'Revenue ascending', value: '&sort_by=revenue.asc'},
        {title: 'Vote average descending', value: '&sort_by=vote_average.desc'},
        {title: 'Vote average ascending', value: '&sort_by=vote_average.asc'},
      ],
      mediatypeOptions: [
        {title: 'Movie', value: 'movie'},
        {title: 'TVShow', value: 'tv'}
      ],
      year: '',
      genre: '',
      people: '',
      vote: '',
      sort: '&sort_by=popularity.desc',
      mediatype: 'movie',
      searchResultPage: {},
      filteredSearchResults: {},
      movieGenres: null,
      tvshowGenres: null,
      searchQuery: '',
      pageNumber: '',
      animals: ['first animal', "second animal"],
      selectedActorFromList: '',
      selectedYear: '&year=',
      selectedGenreID: '',
      selectedGenreIDString: '&with_genres=',
      selectedActor: '&with_people=',
      selectedVote: '&vote_average.gte=',
      // adult: '&include_adult=false',
      // video: '&include_video=false',
      // language: '&language=en-US'
    };
  },
  components: {
    DiscoverCover,
    Autocomplete
  },
  computed: {
    genres() {
      return this.mediatype === "movie" ? this.movieGenres : this.tvshowGenres
    }
  },
  watch: {
    mediatype() {
      this.genre = ''
    },
    $route() {
      // if (this.$route.fullPath.indexOf("?") !== -1 & this.searchResultPage.page !== 0) {
        // console.log(this.$route.fullPath)
      
      // this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
      let routeMediatype = this.$route.fullPath.split("?")[1].split("&")[0]
      // console.log(routeMediatype)
      let routeSortBy = this.$route.fullPath.split("?")[1].split("&")[1]
      // console.log(routeSortBy)
      // console.log(this.$route.fullPath.split("?")[1].split("&")[2])
      // console.log(this.$route.fullPath.split("?")[1].split("&")[3])
      let routeVote = this.$route.fullPath.split("?")[1].split("&")[2]
      // console.log(routeVote)
      let routeActor = this.$route.fullPath.split("?")[1].split("&")[3]
      // console.log(routeActor)
      let routeGenre = this.$route.fullPath.split("?")[1].split("&")[4]
      // console.log(routeGenre)
      let routeYear = this.$route.fullPath.split("?")[1].split("&")[5]
      // console.log(routeYear)
      let page = this.$route.fullPath.split("page=")[1]
      // console.log(page)
      // console.log(this.$route.fullPath.split("?")[1].split("&")[8])
      // console.log(this.$route)
      this.getFirstPageSearchResults(routeMediatype, routeSortBy, routeVote, routeActor, routeGenre, routeYear, page);
      // } else {
      //   this.searchResultPage.page = 0
      // }
    },
  },
  created() {
    let routeMediatype = this.$route.fullPath.split("?")[1].split("&")[0]
      // console.log(routeMediatype)
      let routeSortBy = this.$route.fullPath.split("?")[1].split("&")[1]
      // console.log(routeSortBy)
      // console.log(this.$route.fullPath.split("?")[1].split("&")[2])
      // console.log(this.$route.fullPath.split("?")[1].split("&")[3])
      let routeVote = this.$route.fullPath.split("?")[1].split("&")[2]
      // console.log(routeVote)
      let routeActor = this.$route.fullPath.split("?")[1].split("&")[3]
      // console.log(routeActor)
      let routeGenre = this.$route.fullPath.split("?")[1].split("&")[4]
      // console.log(routeGenre)
      let routeYear = this.$route.fullPath.split("?")[1].split("&")[5]
      // console.log(routeYear)
      let page = this.$route.fullPath.split("page=")[1]
      // console.log(page)
      // console.log(this.$route.fullPath.split("?")[1].split("&")[8])
      // console.log(this.$route)
      this.getFirstPageSearchResults(routeMediatype, routeSortBy, routeVote, routeActor, routeGenre, routeYear, page);
    // axios
    //     .get(
    //       `https://api.themoviedb.org/3/discover/${this.mediatype}?api_key=12a5356516535d4d67654a936a088c1b&language=en-US${this.sort}&include_adult=false&include_video=false${this.selectedVote}${this.selectedActor}${this.selectedGenreIDString}${this.selectedYear}&page=1`
    //     )
    //     .then((response) => {
    //       this.searchResultPage = response.data;
    //     });
    this.movieGenres = this.$store.state.MovieGenres
    this.tvshowGenres = this.$store.state.TVShowGenres
    // let routeMediatype = this.$route.fullPath.split("?")[1].split("&")[0]
    // let routeSortBy = this.$route.fullPath.split("?")[1].split("&")[1]
    // console.log(this.$route.fullPath.split("?")[1].split("&")[2])
    // console.log(this.$route.fullPath.split("?")[1].split("&")[3])
    // let routeVote = this.$route.fullPath.split("?")[1].split("&")[4]
    // let routeActor = this.$route.fullPath.split("?")[1].split("&")[5]
    // let routeGenre = this.$route.fullPath.split("?")[1].split("&")[6]
    // let routeYear = this.$route.fullPath.split("?")[1].split("&")[7]
    // console.log(this.$route.fullPath.split("?")[1].split("&")[8])
    // console.log(this.$route)
  },
  methods: {
    async search(input) {
      if (input.length < 1) {
        this.selectedActorFromList = ''
        return []
      }
      let a = []
      await axios
          .get(
            `https://api.themoviedb.org/3/search/person?api_key=f943d3d10cc39fd734122d69efabbacb&language=en-US&query=${input}&include_adult=false&page=1`
  
          )
          .then((response) => {
            a = response.data.results
          a.filter(animal => {
            return animal.name.toLowerCase()
                .includes(input.toLowerCase())
            })
          });
          // console.log(input.length)
      return a
    },
    getResultValue(result) {
      return result.name
    },
    onSubmit(result) {
      if (result) {
        this.selectedActorFromList = result.id
      }

    },
    searchRequest() {
      this.selectedYear = '&year='
      // let selectedGenreID = ''
      this.selectedGenreIDString = '&with_genres='
      this.selectedActor = '&with_people='
      this.selectedVote = '&vote_average.gte='
      if (this.year) {
        this.selectedYear += this.year
      }
      if (this.genre) {
        this.selectedGenreID = this.genres.find(name => name.name === this.genre)
        this.selectedGenreIDString += this.selectedGenreID.id
      }
      if (this.selectedActorFromList) {
        this.selectedActor += this.selectedActorFromList
      }
      if (this.vote) {
        this.selectedVote += this.vote
      }
      // axios
      //   .get(
      //     `https://api.themoviedb.org/3/discover/${this.mediatype}?api_key=12a5356516535d4d67654a936a088c1b&language=en-US${this.sort}&include_adult=false&include_video=false${this.selectedVote}${this.selectedActor}${this.selectedGenreIDString}${this.selectedYear}&page=1`
      //   )
      //   .then((response) => {
      //     this.searchResultPage = response.data;
      //   });
      this.$router.push(`${this.$route.path}?${this.mediatype}${this.sort}${this.selectedVote}${this.selectedActor}${this.selectedGenreIDString}${this.selectedYear}&page=1`);

    },
    getFirstPageSearchResults(routeMediatype, routeSortBy, routeVote, routeActor, routeGenre, routeYear, page) {
      axios
        .get(
          `https://api.themoviedb.org/3/discover/${routeMediatype}?api_key=12a5356516535d4d67654a936a088c1b&language=en-US&${routeSortBy}&include_adult=false&include_video=false&${routeVote}&${routeActor}&${routeGenre}&${routeYear}&page=${page}`
        )
        .then((response) => {
          this.searchResultPage = response.data;
          console.log(this.searchResultPage)
          console.log(this.routeMediatype)
        });
    },
    getNextPageSearchResults() {
      // console.log(this.$route.fullPath)
      // console.log(this.$route.fullPath.split("page=")[1])
      // this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
      let routeMediatype = this.$route.fullPath.split("?")[1].split("&")[0]
      let routeSortBy = this.$route.fullPath.split("?")[1].split("&")[1]
      // console.log(this.$route.fullPath.split("?")[1].split("&")[2])
      // console.log(this.$route.fullPath.split("?")[1].split("&")[3])
      let routeVote = this.$route.fullPath.split("?")[1].split("&")[2]
      let routeActor = this.$route.fullPath.split("?")[1].split("&")[3]
      let routeGenre = this.$route.fullPath.split("?")[1].split("&")[4]
      let routeYear = this.$route.fullPath.split("?")[1].split("&")[5]
      // console.log(this.$route.fullPath.split("?")[1].split("&")[8])
      // console.log(this.$route)
      this.pageNumber = ++this.$route.fullPath.split("page=")[1];
      // axios
      //   .get(
      //     `https://api.themoviedb.org/3/discover/${this.mediatype}?api_key=12a5356516535d4d67654a936a088c1b&language=en-US&sort_by=${this.sort}&include_adult=false&include_video=false${this.selectedVote}${this.selectedActor}${this.selectedYear}${this.selectedGenreIDString}&page=${this.pageNumber}`
      //   )
      //   .then((response) => {
      //     this.searchResultPage = response.data;
      //   });
          this.$router.push(`${this.$route.path}?${routeMediatype}&${routeSortBy}&${routeVote}&${routeActor}&${routeGenre}&${routeYear}&page=${this.pageNumber}`);
    },
    getPreviousPageSearchResults() {
      // console.log(this.$route.fullPath)
      // console.log(this.$route.fullPath.split("page=")[1])
      // this.searchQuery = this.$route.fullPath.split("?")[1].split("&")[0];
      let routeMediatype = this.$route.fullPath.split("?")[1].split("&")[0]
      let routeSortBy = this.$route.fullPath.split("?")[1].split("&")[1]
      // console.log(this.$route.fullPath.split("?")[1].split("&")[2])
      // console.log(this.$route.fullPath.split("?")[1].split("&")[3])
      let routeVote = this.$route.fullPath.split("?")[1].split("&")[2]
      let routeActor = this.$route.fullPath.split("?")[1].split("&")[3]
      let routeGenre = this.$route.fullPath.split("?")[1].split("&")[4]
      let routeYear = this.$route.fullPath.split("?")[1].split("&")[5]
      // console.log(this.$route.fullPath.split("?")[1].split("&")[8])
      // console.log(this.$route)
      this.pageNumber = --this.$route.fullPath.split("page=")[1];
      // axios
      //   .get(
      //     `https://api.themoviedb.org/3/discover/${this.mediatype}?api_key=12a5356516535d4d67654a936a088c1b&language=en-US&sort_by=${this.sort}&include_adult=false&include_video=false${this.selectedVote}${this.selectedActor}${this.selectedYear}${this.selectedGenreIDString}&page=${this.pageNumber}`
      //   )
      //   .then((response) => {
      //     this.searchResultPage = response.data;
      //   });
          this.$router.push(`${this.$route.path}?${routeMediatype}&${routeSortBy}&${routeVote}&${routeActor}&${routeGenre}&${routeYear}&page=${this.pageNumber}`);
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
.flex2 {
  display: flex;
  justify-content: space-between;
}
.flexcol {
  display: flex;
  flex-direction: column;
}
</style>
