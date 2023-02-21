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
        v-if="item.poster_path"
        class="cover-template1__poster"
        :src="`${globalImgAddress}154${item.poster_path}`"
      />
      <img v-else class="cover-template1__poster" src="@/assets/no-image.png" />
      <div v-if="item.title || item.name" class="cover-template1__film-title">
        {{ item.title || item.name }}
      </div>
      <div v-else class="cover-template1__film-title">
        {{ 'cover-template-1-db' | localize }}
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
        v-if="item.poster_path"
        class="cover-template1__poster"
        :src="`${globalImgAddress}154${item.poster_path}`"
      />
      <img v-else class="cover-template1__poster" src="@/assets/no-image.png" />
      <div
        v-if="
          item.title || item.name || item.original_title || item.original_name
        "
        class="cover-template1__film-title"
      >
        {{
          item.title || item.name || item.original_title || item.original_name
        }}
      </div>
      <div v-else class="cover-template1__film-title">
        {{ 'cover-template-1-db' | localize }}
      </div>
      <div
        v-if="item.genre_ids && item.genre_ids.length"
        class="cover-template1__film-title"
      >
        {{ genresNames }}
      </div>
      <div v-else class="cover-template1__film-title">
        {{ 'cover-template-1-genres-are-not-provided' | localize }}
      </div>
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
        v-if="item.profile_path"
        class="cover-template1__poster"
        :src="`${globalImgAddress}154${item.profile_path}`"
      />
      <img v-else class="cover-template1__poster" src="@/assets/no-image.png" />
      <div class="cover-template1__film-title">{{ item.name }}</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import filmGenresMixin from '@/mixins/filmGenresMixin';
import { globalImgAddress } from '@/main';
import { ISearchFilm } from '@/interfaces/ISearchFilm';
import { ISearchActor } from '@/interfaces/ISearchActor';
import { ISearchTVShow } from '@/interfaces/ISearchTVShow';
import { IGenre } from '@/interfaces/IGenre';

@Component({})
export default class CoverTemplate1 extends mixins(filmGenresMixin) {
  globalImgAddress = globalImgAddress;

  get genresNames() {
    return this.getCurrentMediaTypeGenresNames(
      this.genres,
      (this.item as ISearchFilm | ISearchTVShow).genre_ids
    );
  }

  @Prop()
  item!: ISearchFilm | ISearchTVShow | ISearchActor;

  @Prop()
  genres!: Array<IGenre>;

  @Prop()
  searchQuery!: string;
}
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
