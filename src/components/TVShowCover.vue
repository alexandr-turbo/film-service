<template>
  <div>
    <router-link
      tag="button"
      class="button"
      :to="{
        name: 'movie',
        params: {
          movieID: item.id,
          movieType: 'tv',
        },
      }"
    >
      <img
        :title="item.overview"
        class="main-imgs"
        :src="`${globalImgAddress}92${item.poster_path}`"
      />
    </router-link>
    <div>
      {{ item.original_name }}
    </div>
    <div>
      {{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}
    </div>
  </div>
</template>
<script>
// import axios from "axios";
// import Slick from "vue-slick";
// import movieGenresMixin from "@/mixins/movieGenresMixin";

export default {
  props: ["genres", "item"],
  // mixins: [movieGenresMixin],
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cs {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
}
.text-justify {
  text-align: center;
}
</style>
