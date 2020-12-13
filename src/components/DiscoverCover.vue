<template>
  <div>
    <router-link
      tag="div"
      class="classas"
      :to="{
        name: 'movie',
        params: { movieID: movie.id, movieType: movieType },
      }"
    >
      <img
        v-if="movie.poster_path && movie.poster_path !== ''"
        class="movie-image"
        :src="`${globalImgAddress}1280${movie.poster_path}`"
      />
      <img v-else class="movie-image" src="@/assets/no-image.png" />
      <div v-if="movie.title || movie.name" class="movie-title">
        {{ movie.title || movie.name}}
      </div>
      <div v-else class="movie-title">
        DB thinks that search keyword is included
      </div>
    </router-link>
  </div>
</template>
<script>

export default {
  props: ["movie", "movieType"],
  // created() {
  //   console.log(this.movie)
  // }
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
.movie-image {
  object-fit: fill;
  border-radius: 5px;
  /* width: 80%; */
  /* height: auto; */
  height: 246px;
  margin: 36px auto 12px;
}
.movie-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
}
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
