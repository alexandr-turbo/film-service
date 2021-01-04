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
          index % 2 === 0
            ? 'actor-cast-crew-template__bio--right-border'
            : 'actor-cast-crew-template__bio--left-border'
        "
      >
        <div class="actor-cast-crew-template__bio">
          <img
            v-if="arr.poster_path && arr.poster_path !== ''"
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
              Title: {{ arr.media_type === "movie" ? arr.title : arr.name }}
            </div>
            <div v-if="arr.original_title || arr.original_name">
              Original title:
              {{
                arr.media_type === "movie"
                  ? arr.original_title
                  : arr.original_name
              }}
            </div>
            <div v-if="arr.character">Character: {{ arr.character }}</div>
            <div v-if="arr.job">Job: {{ arr.job }}</div>
            <div v-if="arr.genre_ids">
              Genres:
              {{ getCurrentMediaTypeGenresNames(genres, arr.genre_ids) }}
            </div>
            <div v-if="arr.department">Department: {{ arr.department }}</div>
            <div v-if="arr.media_type" class="actor-cast-crew-template__media-type">
              Media type:
              <div
                :class="
                  arr.media_type === 'movie'
                    ? 'actor-cast-crew-template__media-type--capitalize'
                    : 'actor-cast-crew-template__media-type--uppercase'
                "
              >
                {{ arr.media_type }}
              </div>
            </div>
            <div v-if="arr.release_date">
              Release date: {{ arr.release_date }}
            </div>
            <div v-else-if="arr.first_air_date">
              First air date: {{ arr.first_air_date }}
            </div>
            <div v-if="arr.vote_average">Rating: {{ arr.vote_average }}</div>
          </div>
        </div>
        <div v-if="arr.overview" class="actor-cast-crew-template__film-overview">
          Overview: {{ arr.overview }}
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
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
    /* color: green; */
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
.actor-cast-crew-template__media-type--capitalize {
  text-transform: capitalize;
}
.actor-cast-crew-template__media-type--uppercase {
  text-transform: uppercase;
}
.actor-cast-crew-template__film-overview {
  text-align: justify;
  margin-top: 25px;
}
</style>
