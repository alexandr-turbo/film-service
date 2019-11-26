<template>
  <div class="FilmService">
    <h1>{{ msg }}</h1>
    <img>{{ text }}<img>
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
  },
    name: 'FilmService',
    props: {
      msg: String 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
