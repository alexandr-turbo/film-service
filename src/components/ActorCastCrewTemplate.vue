<template>
  <div>
    <router-link
      tag="div"
      class="actor-cast-crew-template"
      :to="{
        name: 'film',
        params: { filmID: arr.id, filmType: arr.media_type },
      }"
    >
      <div
        :class="
          index % 2
            ? 'actor-cast-crew-template__bio--right-border'
            : 'actor-cast-crew-template__bio--left-border'
        "
      >
        <div class="actor-cast-crew-template__bio">
          <img
            v-if="arr.poster_path"
            class="actor-cast-crew-template__poster"
            :src="`${globalImgAddress}154${arr.poster_path}`"
          />
          <img
            v-else
            class="actor-cast-crew-template__poster"
            src="@/assets/no-image.png"
          />
          <div class="actor-cast-crew-template__film-description">
            <div v-if="arr.title || arr.name">
              {{ "actor-cast-crew-template-title" | localize }}:
              {{ arr.media_type === "movie" ? arr.title : arr.name }}
            </div>
            <div v-if="arr.original_title || arr.original_name">
              {{ "actor-cast-crew-template-original-title" | localize }}:
              {{ arr.original_title || arr.original_name }}
            </div>
            <div v-if="arr.character">
              {{ "actor-cast-crew-template-character" | localize }}:
              {{ arr.character }}
            </div>
            <div v-if="arr.job">
              {{ "actor-cast-crew-template-job" | localize }}: {{ arr.job }}
            </div>
            <div
              class="actor-cast-crew-template__genres"
              v-if="arr.genre_ids && arr.genre_ids.length"
            >
              {{ "actor-cast-crew-template-genres" | localize }}:
              {{ getCurrentMediaTypeGenresNames(genres, arr.genre_ids) }}
            </div>
            <div v-if="arr.department">
              {{ "actor-cast-crew-template-department" | localize }}:
              {{ arr.department }}
            </div>
            <div
              v-if="arr.media_type"
              class="actor-cast-crew-template__media-type"
            >
              {{ "actor-cast-crew-template-mediatype" | localize }}:
              {{
                arr.media_type.includes("movie")
                  ? "actor-cast-crew-template-movie"
                  : "actor-cast-crew-template-tvshow" | localize
              }}
            </div>
            <div v-if="arr.release_date">
              {{ "actor-cast-crew-template-release-date" | localize }}:
              {{ arr.release_date }}
            </div>
            <div v-else-if="arr.first_air_date">
              {{ "actor-cast-crew-template-first-air-date" | localize }}:
              {{ arr.first_air_date }}
            </div>
            <div v-if="arr.vote_average">
              {{ "actor-cast-crew-template-rating" | localize }}:
              {{ arr.vote_average }}
            </div>
          </div>
        </div>
        <div
          v-if="arr.overview"
          class="actor-cast-crew-template__film-overview"
        >
          {{ "actor-cast-crew-template-overview" | localize }}:
          {{ arr.overview }}
        </div>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
export default {
  props: ["arr", "index", "genres"],
};
</script>
<style scoped>
.actor-cast-crew-template {
  margin: 25px 0;
  border-radius: 10px;
}
.actor-cast-crew-template__bio--right-border,
.actor-cast-crew-template__bio--left-border {
  display: flex;
  background: var(--third-bg);
  padding: 20px;
  flex-direction: column;
}
.actor-cast-crew-template__bio--right-border {
  border-right: 5px solid var(--accent-color);
}
.actor-cast-crew-template__bio--left-border {
  border-left: 5px solid var(--accent-color);
}
@media (min-width: 540px) {
  .actor-cast-crew-template__bio {
    display: flex;
  }
  .actor-cast-crew-template__poster {
    border-radius: 5px;
    height: 240px;
    width: auto;
    margin-right: 16px;
  }
  .actor-cast-crew-template__film-description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
}
@media (max-width: 539px) {
  .actor-cast-crew-template__poster {
    border-radius: 5px;
    height: 240px;
    width: auto;
  }
  .actor-cast-crew-template__bio {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .actor-cast-crew-template__film-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
}
.actor-cast-crew-template__media-type {
  display: flex;
}
.actor-cast-crew-template__film-overview {
  text-align: justify;
  margin-top: 25px;
}
.actor-cast-crew-template__genres {
  text-transform: capitalize;
}
</style>
