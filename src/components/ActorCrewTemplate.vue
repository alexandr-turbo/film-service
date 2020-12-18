<template>
  <div>
    <router-link
      tag="div"
      class="actor-crew-template"
      :to="{
        name: 'film',
        params: { filmID: crew.id, filmType: crew.media_type },
      }"
    >
      <div
        :class="
          index % 2 === 0
            ? 'actor-crew-template__right-border'
            : 'actor-crew-template__left-border'
        "
      >
        <div class="actor-crew-template__bio">
          <img
            v-if="crew.poster_path && crew.poster_path !== ''"
            class="actor-crew-template__poster"
            :src="`${globalImgAddress}154${crew.poster_path}`"
          />
          <img
            v-else
            class="actor-crew-template__poster"
            src="@/assets/no-image.png"
          />
          <div class="actor-crew-template__film-description">
            <div v-if="crew.title || crew.name">
              Title: {{ crew.media_type === "movie" ? crew.title : crew.name }}
            </div>
            <div v-if="crew.original_title || crew.original_name">
              Original title:
              {{
                crew.media_type === "movie"
                  ? crew.original_title
                  : crew.original_name
              }}
            </div>
            <div v-if="crew.job">Job: {{ crew.job }}</div>
            <div v-if="crew.genre_ids">
              Genres:
              {{ getCurrentMediaTypeGenresNames(genres, crew.genre_ids) }}
            </div>
            <div v-if="crew.department">Department: {{ crew.department }}</div>
            <div v-if="crew.media_type" class="actor-crew-template__media-type">
              Media type:
              <div
                :class="
                  crew.media_type === 'movie'
                    ? 'actor-crew-template__media-type--capitalize'
                    : 'actor-crew-template__media-type--uppercase'
                "
              >
                {{ crew.media_type }}
              </div>
            </div>
            <div v-if="crew.release_date">
              Release date: {{ crew.release_date }}
            </div>
            <div v-else-if="crew.first_air_date">
              First air date: {{ crew.first_air_date }}
            </div>
            <div v-if="crew.vote_average">Rating: {{ crew.vote_average }}</div>
          </div>
        </div>
        <div v-if="crew.overview" class="actor-crew-template__film-overview">
          Overview: {{ crew.overview }}
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["crew", "index", "genres"],
};
</script>
<style scoped>
.actor-crew-template {
  margin: 25px 0;
  border-radius: 10px;
}
.actor-crew-template__right-border {
  display: flex;
  background: #1c262b;
  padding: 20px;
  border-right: 5px solid white;
  flex-direction: column;
}
.actor-crew-template__left-border {
  display: flex;
  background: #1c262b;
  flex-direction: column;
  padding: 20px;
  border-left: 5px solid white;
}
@media (max-width: 539px) {
  .actor-crew-template__bio {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (min-width: 540px) {
  .actor-crew-template__bio {
    display: flex;
  }
}
@media (max-width: 539px) {
  .actor-crew-template__poster {
    border-radius: 5px;
    height: 240px;
    width: auto;
  }
}
@media (min-width: 540px) {
  .actor-crew-template__poster {
    border-radius: 5px;
    height: 240px;
    width: auto;
    margin-right: 16px;
  }
}
@media (max-width: 539px) {
  .actor-crew-template__film-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
}
@media (min-width: 540px) {
  .actor-crew-template__film-description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
}
.actor-crew-template__media-type {
  display: flex;
}
.actor-crew-template__media-type--capitalize {
  text-transform: capitalize;
}
.actor-crew-template__media-type--uppercase {
  text-transform: uppercase;
}
.actor-crew-template__film-overview {
  text-align: justify;
  margin-top: 25px;
}
</style>
