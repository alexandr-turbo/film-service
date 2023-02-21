<template>
  <div class="cover-template2__container">
    <div
      v-if="!item.media_type"
      class="cover-template2"
      :title="item.bio"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
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
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
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
        {{ genresNames }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import filmGenresMixin from '@/mixins/filmGenresMixin';
import { globalImgAddress } from '@/main';
import { IGenre } from '@/interfaces/IGenre';
import { ISearchFilm } from '@/interfaces/ISearchFilm';
import { ICoords } from '@/interfaces/ICoords';

@Component({})
export default class CoverTemplate2 extends mixins(filmGenresMixin) {
  globalImgAddress = globalImgAddress;

  mouseDown: ICoords = {
    x: 0,
    y: 0,
  };

  onMouseDown(e: MouseEvent): void {
    this.mouseDown = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  onMouseUp(e: MouseEvent): void {
    if (e.clientX === this.mouseDown.x && e.clientY === this.mouseDown.y) {
      if (!this.item.media_type) {
        this.$router.push(`/person/${this.item.id}`);
      } else {
        this.$router.push(`details/${this.item.media_type}/${this.item.id}`);
      }
    }
  }

  get genresNames() {
    return this.getCurrentMediaTypeGenresNames(
      this.genres,
      this.item.genre_ids
    );
  }

  @Prop()
  item!: ISearchFilm;

  @Prop()
  genres!: Array<IGenre>;
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
