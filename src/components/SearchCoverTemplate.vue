<template>
  <div>
    <router-link
      v-if="searchQuery !== 'popular_people'"
      tag="div"
      class="classas"
      :to="{
        name: 'film',
        params: { filmID: item.id, filmType: item.media_type },
      }"
    >
      <img
        v-if="item.poster_path && item.poster_path !== ''"
        class="film-image"
        :src="`${globalImgAddress}154${item.poster_path}`"
        :title="item.overview"
      />
      <img v-else class="film-image" :title="item.overview" src="@/assets/no-image.png" />
      <div v-if="item.title || item.name || item.original_title || item.original_name" class="film-title">
        {{ item.title || item.name || item.original_title || item.original_name }}
      </div>
      <div v-else class="film-title">
        DB thinks that search keyword is included
      </div>
      <div v-if="item.genre_ids && item.genre_ids !== ''" class="film-title">
        {{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}
      </div>
      <div v-else class="film-title">Genres are not provided</div>
    </router-link>
    <router-link
      v-else-if="searchQuery === 'popular_people'"
      tag="div"
      class="classas"
      :to="{
        name: 'actor',
        params: {
          actorID: item.id,
        },
      }"
    >
      <img
        v-if="item.profile_path && item.profile_path !== ''"
        class="film-image"
        :src="`${globalImgAddress}154${item.profile_path}`"
        :title="item.bio"
      />
      <img
        v-else
        class="film-image"
        src="@/assets/no-image.png"
      />
      <div class="film-title">{{ item.name }}</div>
    </router-link>
  </div>
</template>
<script>

export default {
  props: ["item", "genres", "searchQuery"],
  // created() {
  //   debugger
  //   console.log(this.item.bio)
  // }
};
</script>
<style scoped>
.film-image {
  object-fit: fill;
  border-radius: 5px;
  height: 246px;
  margin: 36px auto 12px;
}
@media (max-width: 479px) {
  .film-image {
    height: 400px;
  }
}
.film-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
.classas {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
</style>
