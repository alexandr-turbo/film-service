<template>
  <div>
    <router-link
      tag="div"
      class="actor-cast-template"
      :to="{
        name: 'film',
        params: { filmID: role.id, filmType: role.media_type },
      }"
    >
      <div
        :class="
          index % 2 === 0
            ? 'actor-cast-template__bio--right-border'
            : 'actor-cast-template__bio--left-border'
        "
      >
        <div class="actor-cast-template__bio">
          <img
            v-if="role.poster_path && role.poster_path !== ''"
            class="actor-cast-template__poster"
            :src="`${globalImgAddress}154${role.poster_path}`"
          />
          <img
            v-else
            class="actor-cast-template__poster"
            src="@/assets/no-image.png"
          />
          <div class="actor-cast-template__film-description">
            <div v-if="role.title || role.name">
              Title: {{ role.media_type === "movie" ? role.title : role.name }}
            </div>
            <div v-if="role.original_title || role.original_name">
              Original title:
              {{
                role.media_type === "movie"
                  ? role.original_title
                  : role.original_name
              }}
            </div>
            <div v-if="role.character">Character: {{ role.character }}</div>
            <div v-if="role.genre_ids">
              Genres:
              {{ getCurrentMediaTypeGenresNames(genres, role.genre_ids) }}
            </div>
            <div v-if="role.media_type" class="actor-cast-template__media-type">
              Media type:
              <div
                :class="
                  role.media_type === 'movie'
                    ? 'actor-cast-template__media-type--capitalize'
                    : 'actor-cast-template__media-type--uppercase'
                "
              >
                {{ role.media_type }}
              </div>
            </div>
            <div v-if="role.release_date">
              Release date: {{ role.release_date }}
            </div>
            <div v-else-if="role.first_air_date">
              First air date: {{ role.first_air_date }}
            </div>
            <div v-if="role.vote_average">Rating: {{ role.vote_average }}</div>
          </div>
        </div>
        <div v-if="role.overview" class="actor-cast-template__film-overview">
          Overview: {{ role.overview }}
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["role", "index", "genres"],
};
</script>
<style scoped>
.actor-cast-template {
  margin: 25px 0;
  border-radius: 10px;
}
.actor-cast-template__bio--right-border {
  display: flex;
  background: #1c262b;
  padding: 20px;
  border-right: 5px solid white;
  flex-direction: column;
}
.actor-cast-template__bio--left-border {
  display: flex;
  background: #1c262b;
  flex-direction: column;
  padding: 20px;
  border-left: 5px solid white;
}
@media (min-width: 540px) {
  .actor-cast-template__bio {
    display: flex;
  }

  .actor-cast-template__poster {
    border-radius: 5px;
    height: 240px;
    width: auto;
    margin-right: 16px;
  }

  .actor-cast-template__film-description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
}

@media (max-width: 539px) {
  .actor-cast-template__poster {
    border-radius: 5px;
    height: 240px;
    width: auto;
  }

  .actor-cast-template__bio {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .actor-cast-template__film-description {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
}

.actor-cast-template__media-type {
  display: flex;
}
.actor-cast-template__media-type--capitalize {
  text-transform: capitalize;
}
.actor-cast-template__media-type--uppercase {
  text-transform: uppercase;
}
.actor-cast-template__film-overview {
  text-align: justify;
  margin-top: 25px;
}
</style>
