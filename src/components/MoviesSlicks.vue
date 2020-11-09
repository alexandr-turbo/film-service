<template id="movies-slicks-template">
  <div>
    <MovieSlick :type="upcoming" />
    <MovieSlick :type="popular" />
    <MovieSlick :type="now_playing" />
    <MovieSlick :type="top_rated" />
  </div>
</template>

<script>
import MovieSlick from "../components/MovieSlick.vue";

export default {
  data() {
    return {
      upcoming: "upcoming",
      popular: "popular",
      now_playing: "now_playing",
      top_rated: "top_rated",
    };
  },
  components: {
    MovieSlick,
  },
};
</script>
