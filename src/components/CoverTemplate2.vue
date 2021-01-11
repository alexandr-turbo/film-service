<template>
  <div class="cover-template2__container">
    <router-link
      v-if="!item.media_type"
      tag="div"
      class="cover-template2"
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
        class="cover-template2__poster"
        :src="`${globalImgAddress}154${item.profile_path}`"
      />
      <img
        v-else
        class="cover-template2__poster"
        src="@/assets/no-image.png"
      />
      <div class="cover-template2__title">{{ item.name }}</div>
    </router-link>
    <router-link
      v-else-if="item.media_type"
      tag="div"
      class="cover-template2"
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
        class="cover-template2__poster"
        :src="`${globalImgAddress}154${item.poster_path}`"
      />
      <img
        v-else
        class="cover-template2__poster"
        src="@/assets/no-image.png"
      />
      <div class="cover-template2__title" v-if="item.title || item.name || item.original_title || item.original_name">
        {{ item.title || item.name || item.original_title || item.original_name }}
      </div>
      <div class="cover-template2__genres">
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
.cover-template2__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cover-template2 {
  margin: 10px auto;
  cursor: pointer;
}
.cover-template2__poster {
  border-radius: 5px;
  height: 190px;
  width: auto;
  margin: 10px auto;
  filter: brightness(0.8);
}
.cover-template2__poster:hover {
  transform: scale(1.1);
  filter: brightness(1);
}
.cover-template2__title,
.cover-template2__genres {
  text-align: center;
}
</style>
