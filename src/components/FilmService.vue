<template>
  <div class="container" v-if="text != null">
    <slick ref="slick"  :options="slickOptions" >

        <img :src="`https://image.tmdb.org/t/p/w500${text.poster_path}`">

        <img :src="`https://image.tmdb.org/t/p/w500${text.poster_path}`">
    </slick>
  </div>
</template>

<script>
import axios from 'axios';
import Slick from 'vue-slick';
export default {
  data() {
    return {
      text: null,
      slickOptions: {
        //options can be used from the plugin documentation
        slidesToShow: 1,
        infinite: true
      }
    }
  },
  created() {
    axios.get('https://api.themoviedb.org/3/movie/551?api_key=f943d3d10cc39fd734122d69efabbacb')
    .then(response => {
      this.text = response.data
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

</style>
