<template>
  <div>
    <router-link
      tag="div"
      class="margin"
      :to="{
        name: 'movie',
        params: { movieID: role.id, movieType: role.media_type },
      }"
    >
      <div :class="index % 2 === 0 ? 'lightgray' : 'lightblue'">
        <div :class="index % 2 === 0 ? 'main2' : 'main3'">
          <img
            v-if="role.poster_path && role.poster_path !== ''"
            class="movie-image"
            :class="index % 2 === 0 ? 'left-image' : 'right-image'"
            :src="`${globalImgAddress}1280${role.poster_path}`"
          />
          <img
            v-else
            class="movie-image"
            :class="index % 2 === 0 ? 'left-image' : 'right-image'"
            src="@/assets/no-image.png"
          />
          <div class="actor-description">
            <div>Title: {{ role.title }}</div>
            <div>Original title: {{ role.original_title }}</div>
            <div>Character: {{ role.character }}</div>
            <div>
              Genres:
              {{
                role.media_type === "movie"
                  ? getCurrentMediaTypeGenresNames(
                      movieGenres,
                      role.genre_ids
                    )
                  : getCurrentMediaTypeGenresNames(
                      tvshowGenres,
                      role.genre_ids
                    )
              }}
            </div>
            <div>Media type: {{ role.media_type | capitalize }}</div>
            <div>Release date: {{ role.release_date }}</div>
            <div>Rating: {{ role.vote_average }}</div>
          </div>
        </div>
        <div class="justify">Overview: {{ role.overview }}</div>
      </div>
    </router-link>
  </div>
</template>
<script>
// import axios from "axios";
// import Slick from "vue-slick";
// import movieGenresMixin from "@/mixins/movieGenresMixin";

export default {
  props: ["role", "index", "movieGenres", "tvshowGenres"],
  // mixins: [movieGenresMixin],
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  margin-bottom: 32px;
}
.right-image {
  margin-left: 32px;
  margin-bottom: 32px;
}
.main {
  display: flex;
  justify-content: center;
}
.main2 {
  display: flex;
  align-items: center;
  /* background: lightblue; */
}
.main3 {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  /* background: lightgray; */
}
.justify {
  text-align: justify;
}
.actor-photo {
  border-radius: 5px;
  height: 240px;
  width: auto;
  margin-right: 16px;
}
.actor-description {
  margin: auto 0;
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
  border: lightseagreen 1px solid;
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
/* .actor {
    background: #0D0032;
  } */
</style>
