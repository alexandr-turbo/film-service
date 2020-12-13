<template>
  <div class="cc">
    <router-link
      tag="button"
      class="button"
      :to="{
        name: 'movie',
        params: {
          movieID: item.id,
          movieType: movieType,
        },
      }"
    >
      <img
        :title="item.overview"
        class="main-imgs"
        :src="`${globalImgAddress}92${item.poster_path}`"
      />
    </router-link>
    <div
      v-if="movieType === 'movie'"
      class="text-justify"
    >
      {{ item.original_title }}
    </div>
    <div
      v-else-if="movieType === 'tv'"
      class="text-justify"
    >
      {{ item.original_name }}
    </div>
    <div class="text-justify">
      {{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}
    </div>
  </div>
</template>
<script>

export default {
  props: ["genres", "item", "movieType"],
  // inject: ["genres", "movieType"],
};
</script>
<style scoped>
  .cs {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
  .text-justify {
    text-align: center;
  }
  .cc {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* outline: none !important; */
  }
</style>
