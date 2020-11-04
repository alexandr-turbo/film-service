<template>
  <div class="container">
    <div class="center">
      <input v-model="query" @keyup.enter="getFirstPageSearchResults(query)">
    </div>

    <!-- <router-link :to="{ name: 'search', params: { query: query } }">
      <input v-model="query" @keyup.enter="getFirstPageSearchResults(query)">
    </router-link> -->

    <div class="flex" v-if="searchResultPage.total_results">
      <router-link
        tag="div"
        class="flex-col"
        v-for="movie in searchResultPage.results"
        :key="movie.id"
        :to="{
          name: 'movie',
          params: { movieID: movie.id, movieType: movie.media_type },
        }"
      >
      <!-- <div v-for="movie in searchResultPage.results" :key="movie.id"> -->
        <img
          v-if="movie.poster_path && movie.poster_path !== ''"
          class="movie-image"
          :src="`https://image.tmdb.org/t/p/w1280${movie.poster_path}`"
        />
        <img
          v-else
          class="movie-image"
          src="../../public/no-image.png"
        />
        <div v-if="movie.title && movie.title !== ''" class="movie-title"> {{ movie.title }} </div>
        <div v-else-if="movie.original_title && movie.original_title !== ''" class="movie-title"> {{ movie.original_title }} </div>
        <div v-else class="movie-title"> DB thinks that search keyword is included </div>
        <div v-if="movie.genre_ids && movie.genre_ids !== ''" class="movie-title"> {{ get_genre(genres, movie.genre_ids) }} </div>
        <div v-else class="movie-title"> Genres are not provided </div>
        <!-- <div> {{ movie.backdrop_path }} </div>
        <div> {{ movie.media_type }} </div>
        <div> {{ movie.original_title }} </div>
        <div> {{ movie.overview }} </div>
        <div> {{ movie.popularity }} </div>
        <div> {{ movie.release_date }} </div>
        <div> {{ movie.vote_average }} </div> -->
      <!-- </div> -->
      </router-link>
    </div>
    <div class="center" v-else>
      Nothing found
    </div>
    <div v-if="searchResultPage.page" class="center mt">
      <!-- <button v-if="searchResultPage.page > 1" @click="getPreviousPageSearchResults(query, searchResultPage.page - 1), pageChangeHandler(searchResultPage.page - 1)">Previous page</button> -->
      <!-- <button class="pretty" v-if="searchResultPage.page > 1" @click="getPreviousPageSearchResults(query, searchResultPage.page - 1)">Previous page</button> -->
      <button class="pretty" v-if="searchResultPage.page > 1" @click="getPreviousPageSearchResults(query, searchResultPage.page - 1)">Previous page</button>
      <!-- <button v-if="searchResultPage.page < searchResultPage.total_pages" @click="getNextPageSearchResults(query, searchResultPage.page + 1), pageChangeHandler(searchResultPage.page + 1, query)">Next page</button> -->
      <!-- <button class="pretty" v-if="searchResultPage.page < searchResultPage.total_pages" @click="getNextPageSearchResults(query, searchResultPage.page + 1)">Next page</button> -->
      <button class="pretty" v-if="searchResultPage.page < searchResultPage.total_pages" @click="getNextPageSearchResults(query, searchResultPage.page + 1)">Next page</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      query: '',
      searchResultPage: {},
      filteredSearchResults: {},
      genres: null,
    }
  },
  // mounted() {
  //   window.onpopstate = function () {
  //     this.getPreviousPageSearchResults(this.query, this.page)
  //   };
  // },
  created() {
    axios
      .get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=f943d3d10cc39fd734122d69efabbacb"
      )
      .then((response) => {
        this.genres = response.data.genres;
      });
  },
  methods: {
    // pageChangeHandler(page, query) {
    //   this.$router.push(`${this.$route.path}/${query}?page=${page}`)
    // },
    get_genre(genres, genre_ids) {
      var genre_container = [];
      var k = 0;
      for (var i = 0; i < genre_ids.length; i++) {
        for (var j = 0; j < genres.length; j++) {
          if (genre_ids[i] === genres[j].id) {
            genre_container[k] = genres[j].name;
            k++;
          }
        }
      }
      if (genre_container.length === 0) {
        return;
      } else if (genre_container.length === 1) {
        return genre_container[0];
      } else if (genre_container.length > 1) {
        return genre_container[0] + "/" + genre_container[1];
      }
    },
    getFirstPageSearchResults(query) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${query}&page=1&include_adult=false`
        )
        .then((response) => {
          this.searchResultPage = response.data;

          this.$router.push(`${this.$route.path}?${query}`)

          let newRoute = this.$route.fullPath.split('?')[1].split('&')[0];
          let newPage = this.$route.fullPath.split('=')[1];
          /*eslint-disable*/
          console.log(newRoute)
          console.log(newPage)
          /*eslint-enable*/
        })
    },
    getNextPageSearchResults(query, page) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${query}&page=${page}&include_adult=false`
        )
        .then((response) => {
          this.searchResultPage = response.data;

          this.$router.push(`${this.$route.path}?${query}&page=${page}`)

          let newRoute = this.$route.fullPath.split('?')[1].split('&')[0];
          let newPage = this.$route.fullPath.split('=')[1];
          /*eslint-disable*/
          console.log(newRoute)
          console.log(newPage)
          /*eslint-enable*/
        })
    },
    getPreviousPageSearchResults(query, page) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${query}&page=${page}&include_adult=false`
        )
        .then((response) => {
          this.searchResultPage = response.data;

          page === 1 ? this.$router.push(`${this.$route.path}?${query}`) : this.$router.push(`${this.$route.path}?${query}&page=${page}`)

          let newRoute = this.$route.fullPath.split('?')[1].split('&')[0];
          let newPage = this.$route.fullPath.split('=')[1];
          /*eslint-disable*/
          console.log(newRoute)
          console.log(newPage)
          /*eslint-enable*/
        })
    },
  }
}
// export default {
//     data() {
//         return {
//             test: {},
//         };
//     },
//     props: ["searchPhrase"],
//     created() {
//         /*eslint-disable*/
//         console.log(this.searchPhrase)
//         console.log(this.$route.path)
//         /*eslint-enable*/
//         axios
//             .get(
//                 `https://api.themoviedb.org/3/search/multi?api_key=f943d3d10cc39fd734122d69efabbacb&query=${this.searchPhrase}&page=1&include_adult=false`
//             )
//             .then((response) => {
//                 this.test = response.data;
//                 /*eslint-disable*/
//                 console.log(this.test)
//                 console.log(this.$route.path)
//                 /*eslint-enable*/
//             })
//     }
// }
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