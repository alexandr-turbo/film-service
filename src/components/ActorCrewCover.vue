<template>
  <div>
    <router-link
      tag="div"
      class="margin"
      :to="{
        name: 'movie',
        params: { movieID: crew.id, movieType: crew.media_type },
      }"
    >
      <div :class="index % 2 === 0 ? 'main2' : 'main3'">
        <div class="fl">
          <img
            v-if="crew.poster_path && crew.poster_path !== ''"
            class="movie-image"
            :src="`${globalImgAddress}1280${crew.poster_path}`"
          />
          <img
            v-else
            class="movie-image"
            src="@/assets/no-image.png"
          />
          <div class="actor-description">
            <div v-if="crew.title || crew.name">Title: {{ crew.media_type === "movie" ? crew.title : crew.name }}</div>
            <div v-if="crew.original_title || crew.original_name">Original title: {{ crew.media_type === "movie" ? crew.original_title : crew.original_name }}</div>
            <div v-if="crew.job">Job: {{ crew.job }}</div>
            <div v-if="crew.genre_ids">
              Genres:
              {{
                getCurrentMediaTypeGenresNames(
                      genres,
                      crew.genre_ids
                    )
              }}
            </div>
            <div v-if="crew.department">Department: {{ crew.department }}</div>
            <div v-if="crew.media_type" class="cap">Media type: {{ crew.media_type }}</div>
            <div v-if="crew.release_date">Release date: {{ crew.release_date }}</div>
            <div v-else-if="crew.first_air_date">First air date: {{ crew.first_air_date }}</div>
            <div v-if="crew.vote_average">Rating: {{ crew.vote_average }}</div>
          </div>
        </div>
        <div v-if="crew.overview" class="justify">Overview: {{ crew.overview }}</div>
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
.fl {
  display: flex;
}
.actor-image {
  border-radius: 5px;
  height: 190px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
.movie-image {
  border-radius: 5px;
  height: 240px;
  width: auto;
}
.left-image {
  margin-right: 32px;
}
.right-image {
  margin-left: 32px;
}
.main {
  display: flex;
  justify-content: center;
}
.main2 {
  display: flex;
  background: #1C262B;
  padding: 20px;
  border-right: 5px solid white;
  flex-direction: column;
}
.main3 {
  display: flex;
  background: #1C262B;
  flex-direction: column;
  padding: 20px;
  border-left: 5px solid white;
}
.justify {
  text-align: justify;
  margin-top: 25px;
}
.actor-photo {
  border-radius: 5px;
  height: 240px;
  width: auto;
  margin-right: 16px;
}
.actor-description {
  margin: auto 20px;
}
.title {
  font-size: 32px;
}
.genres {
  display: flex;
}
.lightgray {
  border-radius: 10px;
  background: lightgray;
  padding: 20px;
}
.lightblue {
  border-radius: 10px;
  background: lightyellow;
  padding: 20px;
}
.margin {
  margin: 25px 0;
  border-radius: 10px;
}
.margin2 {
  padding: 20px;
  border-radius: 10px;
  border: lightseagreen 1px solid;
}
.blue {
  background: lightblue;
}
.pink {
  background: lightpink;
}
.cap {
  text-transform: capitalize;
}
</style>
