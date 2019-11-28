<template>
  <div class="container" v-if="upcoming != null && popular != null && now_playing != null && top_rated != null && genres != null">
    <!-- <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in latest" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h6> {{ latest.original_title }}</h6>
        <h6 > {{ get_genre(genres, item.genre_ids) }} </h6>
      </div>
    </slick> -->
    <h3 class="uppercase left-text">upcoming</h3>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in upcoming" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h4> {{ item.original_title }}</h4>
        <h5> {{ get_genre(genres, item.genre_ids) }} </h5>
      </div>
    </slick>
    <h3 class="uppercase left-text">popular</h3>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in popular" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h4> {{ item.original_title }}</h4>
        <h5> {{ get_genre(genres, item.genre_ids) }} </h5>
      </div>
    </slick>
    <h3 class="uppercase left-text">now playing</h3>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in now_playing" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h4> {{ item.original_title }}</h4>
        <h5> {{ get_genre(genres, item.genre_ids) }} </h5>
      </div>
    </slick>
    <h3 class="uppercase left-text">top rated</h3>
    <slick class="slick" ref="slick"  :options="slickOptions" >
      <div v-for="item in top_rated" v-bind:key="item.id">
        <img :src="`https://image.tmdb.org/t/p/w92${item.poster_path}`">
        <h4> {{ item.original_title }}</h4>
        <h5> {{ get_genre(genres, item.genre_ids) }} </h5>
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
      latest: null,
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
        autoplay: true,
        autoplaySpeed: 500
      }
    }
  },
  created() {
    // axios.get('https://api.themoviedb.org/3/movie/latest?api_key=f943d3d10cc39fd734122d69efabbacb')
    // .then(response => {
    //   this.latest = response.data
    // }),
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
      var k = 0;
      for (var i = 0; i < genre_ids.length; i++) {
        for (var j = 0; j < genres.length; j++) {
          if (genre_ids[i] === genres[j].id) {
            genre_container[k] = genres[j].name;
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
    padding: 2rem 4rem;
    margin: 0 auto;
    max-width: 80%;

  }
  img {
    border-radius: 5px;
    height: 190px;
    width: auto;
    margin-left: auto;
    margin-right: auto;
  }
  h6 {
    margin: 0;
    padding: 0;
  }
  .uppercase { 
    text-transform: uppercase;
  }
  .left-text {
    text-align: left;
  }
</style>
