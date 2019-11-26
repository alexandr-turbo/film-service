<template>
  <div class="FilmService">
    <!-- <img :src="`https://image.tmdb.org/t/p/w500${text.poster_path}`"> -->




        <img :src="`https://image.tmdb.org/t/p/w500${text.poster_path}`">

        <img :src="`https://image.tmdb.org/t/p/w500${text.poster_path}`">



  </div>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    text: null
  }),
  created() {
    axios.get('https://api.themoviedb.org/3/movie/551?api_key=f943d3d10cc39fd734122d69efabbacb')
    .then(response => {
      this.text = response.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
