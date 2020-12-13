<template id="movies-slicks-template">
  <div>
    <div v-for="movieSlick in movieSlickArr" :key="movieSlick.id">
      <MovieSlick :type="movieSlick" />
    </div>
  </div>
</template>

<script>
import MovieSlick from "../components/MovieSlick.vue";

export default {
  data() {
    return {
      movieSlickArr: ["upcoming", "popular", "now_playing", "top_rated"]
    };
  },
  components: {
    MovieSlick,
  },
};
</script>
