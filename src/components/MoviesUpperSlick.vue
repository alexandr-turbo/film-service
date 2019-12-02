<template id="movies-upper-slick-template">
    <div class="upper-slick" v-if="popular != null && genres != null">
      <slick class="slick" ref="slick"  :options="slickOptionsUpper" >
        <div v-for="item in popular" v-bind:key="item.id">
          <img class="upper-imgs" :src="`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`">
          <div class="upper-text white-text">
            <h3 class="uppercase">popular</h3>
            <h4> {{ item.original_title }}</h4>
            <h5> {{ get_genre(genres, item.genre_ids) }} </h5>
          </div>
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
      popular: null,
      genres: null,
      slickOptionsUpper: {
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000
      }
    }
  },
  created() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f943d3d10cc39fd734122d69efabbacb')
    .then(response => {
      this.popular = response.data.results
    }),
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f943d3d10cc39fd734122d69efabbacb')
    .then(response => {
      this.genres = response.data.genres
    })
  },
  components: {
    Slick
  },
  methods: {
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
  img.upper-imgs {
    margin: 0;
    padding: 0;
    height: auto;
    width: 100vw;
  }
  .uppercase { 
    text-transform: uppercase;
  }
  .left-text {
    text-align: left;
  }
  .upper-text {
    text-align: left;
    margin-left: 100px;
    margin-top: -350px;
    padding-bottom: 50px;
  }
  .white-text {
    color: white;
  }
</style>
