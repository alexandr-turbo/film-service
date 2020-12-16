<template>
  <div>
    <router-link
      tag="div"
      class="classas"
      :to="{
        name: 'film',
        params: { filmID: film.id, filmType: film.media_type },
      }"
    >
      <img
        v-if="film.poster_path && film.poster_path !== ''"
        class="film-image"
        :src="`${globalImgAddress}154${film.poster_path}`"
        :title="film.overview"
      />
      <img v-else class="film-image" :title="film.overview" src="@/assets/no-image.png" />
      <div v-if="film.title && film.title !== ''" class="film-title">
        {{ film.title }}
      </div>
      <div
        v-else-if="film.original_title && film.original_title !== ''"
        class="film-title"
      >
        {{ film.original_title }}
      </div>
      <div v-else class="film-title">
        DB thinks that search keyword is included
      </div>
      <div v-if="film.genre_ids && film.genre_ids !== ''" class="film-title">
        {{ getCurrentMediaTypeGenresNames(genres, film.genre_ids) }}
      </div>
      <div v-else class="film-title">Genres are not provided</div>
    </router-link>
  </div>
</template>
<script>

export default {
  props: ["film", "genres"],
};
</script>
<style scoped>
.flex {
  display: flex;
  flex-wrap: wrap;
}
.flex-col {
  display: flex;
  flex-direction: column;
  width: 20%;
  height: auto;
}
.film-image {
  object-fit: fill;
  border-radius: 5px;
  /* width: 80%; */
  /* height: auto; */
  height: 246px;
  margin: 36px auto 12px;
}
.film-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
/* .container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
} */
.center {
  display: flex;
  justify-content: center;
}
.mt {
  margin-top: 36px;
}
.classas {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
