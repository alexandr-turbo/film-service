<template>
  <div>
    <router-link
      v-if="!searchQuery"
      tag="div"
      class="cover-template1"
      :title="item.overview"
      :to="{
        name: 'film',
        params: { filmID: item.id, filmType: item.media_type },
      }"
    >
      <img
        v-if="item.poster_path && item.poster_path !== ''"
        class="cover-template1__poster"
        :src="`${globalImgAddress}154${item.poster_path}`"
      />
      <img v-else class="cover-template1__poster" src="@/assets/no-image.png" />
      <div v-if="item.title || item.name" class="cover-template1__film-title">
        {{ item.title || item.name }}
      </div>
      <div v-else class="cover-template1__film-title">
        DB thinks that search keyword is included
      </div>
    </router-link>
    <router-link
      v-else-if="searchQuery !== 'popular_people' && item.media_type"
      tag="div"
      class="cover-template1"
      :title="item.overview"
      :to="{
        name: 'film',
        params: { filmID: item.id, filmType: item.media_type },
      }"
    >
      <img
        v-if="item.poster_path && item.poster_path !== ''"
        class="cover-template1__poster"
        :src="`${globalImgAddress}154${item.poster_path}`"
        
      />
      <img v-else class="cover-template1__poster" src="@/assets/no-image.png" />
      <div v-if="item.title || item.name || item.original_title || item.original_name" class="cover-template1__film-title">
        {{ item.title || item.name || item.original_title || item.original_name }}
      </div>
      <div v-else class="cover-template1__film-title">
        DB thinks that search keyword is included
      </div>
      <div v-if="item.genre_ids && item.genre_ids !== '' && item.genre_ids.length" class="cover-template1__film-title">
        {{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}
      </div>
      <div v-else class="cover-template1__film-title">Genres are not provided</div>
    </router-link>
    <router-link
      v-else-if="searchQuery === 'popular_people'"
      tag="div"
      class="cover-template1"
      :title="item.bio"
      :to="{
        name: 'actor',
        params: {
          actorID: item.id,
        },
      }"
    >
      <img
        v-if="item.profile_path && item.profile_path !== ''"
        class="cover-template1__poster"
        :src="`${globalImgAddress}154${item.profile_path}`"
        
      />
      <img
        v-else
        class="cover-template1__poster"
        src="@/assets/no-image.png"
      />
      <div class="cover-template1__film-title">{{ item.name }}</div>
    </router-link>
  </div>
</template>
<script>

export default {
  props: ["item", "genres", "searchQuery"],
};
</script>
<style scoped>
.cover-template1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.cover-template1__poster {
  object-fit: fill;
  border-radius: 5px;
  height: 246px;
  margin: 36px auto 12px;
}
@media (max-width: 479px) {
  .cover-template1__poster {
    height: 400px;
  }
}
.cover-template1__film-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
</style>
