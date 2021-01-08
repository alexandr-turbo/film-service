<template>
  <div>
    <router-link
      tag="div"
      class="discover-cover-template"
      :to="{
        name: 'film',
        params: { filmID: film.id, filmType: filmType },
      }"
    >
      <img
        v-if="film.poster_path && film.poster_path !== ''"
        class="discover-cover-template__poster"
        :title="film.overview"
        :src="`${globalImgAddress}154${film.poster_path}`"
      />
      <img v-else class="discover-cover-template__poster" :title="film.overview" src="@/assets/no-image.png" />
      <div v-if="film.title || film.name" class="discover-cover-template__film-title">
        {{ film.title || film.name }}
      </div>
      <div v-else class="discover-cover-template__film-title">
        DB thinks that search keyword is included
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["film", "filmType"],
};
</script>
<style scoped>
.discover-cover-template {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.discover-cover-template__poster {
  object-fit: fill;
  border-radius: 5px;
  height: 246px;
  margin: 36px auto 12px;
}
@media (max-width: 479px) {
  .discover-cover-template__poster {
    height: 400px;
  }
}
.discover-cover-template__film-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
</style>
