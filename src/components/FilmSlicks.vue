<template id="film-slicks-template">
  <div>
    <div v-for="filmSlick in filmSlickArr" :key="filmSlick.id">
      <FilmSlick :type="filmSlick" :movieType="movieType" :genres="genres" />
    </div>
  </div>
</template>

<script>
import FilmSlick from "../components/FilmSlick.vue";

export default {
  props: ['filmSlickArr', 'movieType', 'genres'],
  components: {
    FilmSlick,
  },
};
</script>
