<template>
  <div class="container" v-if="upcoming != null && popular != null && now_playing != null && top_rated != null ">
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in upcoming" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h6> {{ item.original_title }}</h6>
        <h6 > {{ get_genre(genres, item.genre_ids) }} </h6>
      </div>
    </slick>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in popular" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h6> {{ item.original_title }}</h6>
        <h6 > {{ get_genre(genres, item.genre_ids) }} </h6>
      </div>
    </slick>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in now_playing" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h6> {{ item.original_title }}</h6>
        <h6 > {{ get_genre(genres, item.genre_ids) }} </h6>
      </div>
    </slick>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in top_rated" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h6> {{ item.original_title }}</h6>
        <h6 > {{ get_genre(genres, item.genre_ids) }} </h6>
      </div>
    </slick>
  </div>
</template>

<script>
import axios from 'axios';
import Slick from 'vue-slick';
export default {
  data() {
    return {
      upcoming: null,
      popular: null,
      now_playing: null,
      top_rated: null,
      genres: null,

      // genre_ids: null,
      slickOptions: {
        //options can be used from the plugin documentation
        slidesToShow: 7,
        infinite: true,
        autoplay: true
      }
    }
  },
  created() {
    axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=f943d3d10cc39fd734122d69efabbacb')
    .then(response => {
      this.upcoming = response.data.results
    }),
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f943d3d10cc39fd734122d69efabbacb')
    .then(response => {
      this.popular = response.data.results
    }),
    axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=f943d3d10cc39fd734122d69efabbacb')
    .then(response => {
      this.now_playing = response.data.results
    }),
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=f943d3d10cc39fd734122d69efabbacb')
    .then(response => {
      this.top_rated = response.data.results
    }),
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f943d3d10cc39fd734122d69efabbacb')
    .then(response => {
      this.genres = response.data.genres
    })
  },
  components: {
    Slick
  },
  // All slick methods can be used too, example here
  methods: {
    get_genre(genres, genre_ids) {
      var genre_container = [];
      for (var i = 0; i < genre_ids.length; i++) {
        for (var j = 0; j < genres.length; j++) {
          if (genre_ids[i] == genres[j].id) {
            genre_container[i] = genres[j].name;
          }
        }
      }
      if (genre_container.length === 1) {
        return genre_container[0];
      } else if (genre_container.length > 1) {
        return genre_container[0] + "/" + genre_container[1];
      }
    },
    next() {
      this.$refs.slick.next()
    },
    prev() {
      this.$refs.slick.prev()
    },
    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$refs.slick.reSlick()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 1500px;
    margin-left: auto;
    margin-right: auto;

  }
  img {
    width: 92px !important;
    margin-left: auto;
    margin-right: auto;
  }
  h6 {

  }
  
</style>
