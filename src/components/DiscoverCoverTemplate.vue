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
        :src="`${globalImgAddress}1280${film.poster_path}`"
      />
      <img v-else class="discover-cover-template__poster" src="@/assets/no-image.png" />
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
}
.discover-cover-template__poster {
  object-fit: fill;
  border-radius: 5px;
  height: 246px;
  margin: 36px auto 12px;
}
.discover-cover-template__film-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
</style>
