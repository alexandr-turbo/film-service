<template>
  <div class="home-cover-template__container">
    <router-link
      tag="div"
      class="home-cover-template"
      :title="item.overview"
      :to="{
        name: 'film',
        params: {
          filmID: item.id,
          filmType: item.media_type,
        },
      }"
    >
      <img
        v-if="item.poster_path && item.poster_path !== ''"
        class="home-cover-template__poster"
        :src="`${globalImgAddress}154${item.poster_path}`"
      />
      <img
        v-else
        class="home-cover-template__poster"
        src="@/assets/no-image.png"
      />
      <div class="home-cover-template__title" v-if="item.title || item.name || item.original_title || item.original_name">
        {{ item.title || item.name || item.original_title || item.original_name }}
      </div>
      <div class="home-cover-template__genres">
        {{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["genres", "item"],
};
</script>
<style scoped>
.home-cover-template__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home-cover-template {
  margin: 10px auto;
  cursor: pointer;
}
.home-cover-template__poster {
  border-radius: 5px;
  height: 190px;
  width: auto;
  margin: 10px auto;
  filter: brightness(0.8);
}
.home-cover-template__poster:hover {
  transform: scale(1.1);
  filter: brightness(1);
}
.home-cover-template__title,
.home-cover-template__genres {
  text-align: center;
}
</style>
