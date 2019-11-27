<template>
  <div class="container" v-if="upcoming != null && popular != null && now_playing != null && top_rated != null ">
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in upcoming" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h6> {{ item.original_title }}</h6>
        <h6> {{ item.genre_ids }}</h6>
      </div>
    </slick>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in popular" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h6> {{ item.original_title }}</h6>
        <h6> {{ item.genre_ids }}</h6>
      </div>
    </slick>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in now_playing" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h6> {{ item.original_title }}</h6>
        <h6> {{ item.genre_ids }}</h6>
      </div>
    </slick>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in top_rated" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h6> {{ item.original_title }}</h6>
        <h6> {{ item.genre_ids }}</h6>
        <!-- <div v-for="item2 in genre_ids" v-bind:key="item2.id"><div v-for="item3 in genres" v-bind:key="item3.id"><div v-if="item2.id == item3.id"> {{ item2.name }} </div></div></div> -->
        <!-- <div v-for="item2 in genre_ids" v-bind:key="item2.id"> {{ item2 }} </div> -->
      </div>
    </slick>


    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in genres" v-bind:key="item.id">
        <h6> {{ item }}</h6>
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
