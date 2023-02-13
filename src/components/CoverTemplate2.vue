<template>
  <div class="cover-template2__container">
    <div
      v-if="!item.media_type"
      class="cover-template2"
      :title="item.bio"
      @mousedown="clickable = true"
      @mousemove="clickable = false"
      @mouseup="clickable ? $router.push(`/person/${item.id}`) : ''"
    >
      <img
        v-if="item.profile_path"
        class="cover-template2__poster"
        :src="`${globalImgAddress}154${item.profile_path}`"
      />
      <img v-else class="cover-template2__poster" src="@/assets/no-image.png" />
      <div class="cover-template2__title">{{ item.name }}</div>
    </div>
    <div
      v-else-if="item.media_type"
      class="cover-template2"
      :title="item.overview"
      @mousedown="clickable = true"
      @mousemove="clickable = false"
      @mouseup="
        clickable ? $router.push(`details/${item.media_type}/${item.id}`) : ''
      "
    >
      <img
        v-if="item.poster_path"
        class="cover-template2__poster"
        :src="`${globalImgAddress}154${item.poster_path}`"
      />
      <img v-else class="cover-template2__poster" src="@/assets/no-image.png" />
      <div
        class="cover-template2__title"
        v-if="
          item.title || item.name || item.original_title || item.original_name
        "
      >
        {{
          item.title || item.name || item.original_title || item.original_name
        }}
      </div>
      <div class="cover-template2__genres">
        {{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import filmGenresMixin from "@/mixins/filmGenresMixin";

@Component({})
export default class CoverTemplate2 extends mixins(filmGenresMixin) {
  clickable: boolean = true;

  @Prop()
  item: any;

  @Prop()
  genres: any;
}
</script>
<style scoped>
.cover-template2__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cover-template2__container:focus {
  outline: none;
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
.cover-template2__genres {
  text-transform: capitalize;
}
</style>
