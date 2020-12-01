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
      <div :class="index % 2 === 0 ? 'lightgray' : 'lightblue'">
        <div :class="index % 2 === 0 ? 'main2' : 'main3'">
          <img
            v-if="crew.poster_path && crew.poster_path !== ''"
            class="movie-image"
            :class="index % 2 === 0 ? 'left-image' : 'right-image'"
            :src="`${globalImgAddress}1280${crew.poster_path}`"
          />
          <img
            v-else
            class="movie-image"
            :class="index % 2 === 0 ? 'left-image' : 'right-image'"
            src="../../public/no-image.png"
          />
          <div class="actor-description">
            <div>Title: {{ crew.title }}</div>
            <div>Original title: {{ crew.original_title }}</div>
            <div>Job: {{ crew.job }}</div>
            <div>
              Genres:
              {{
                crew.media_type === "movie"
                  ? getCurrentMediaTypeGenresNames(
                      movieGenres,
                      crew.genre_ids
                    )
                  : getCurrentMediaTypeGenresNames(
                      tvshowGenres,
                      crew.genre_ids
                    )
              }}
            </div>
            <div>Department: {{ crew.department }}</div>
            <div>Media type: {{ crew.media_type | capitalize }}</div>
            <div>Release date: {{ crew.release_date }}</div>
            <div>Rating: {{ crew.vote_average }}</div>
          </div>
        </div>
        <div class="justify">Overview: {{ crew.overview }}</div>
      </div>
    </router-link>
  </div>
</template>
<script>
// import axios from "axios";
// import Slick from "vue-slick";
// import movieGenresMixin from "@/mixins/movieGenresMixin";

export default {
  props: ["crew", "index", "movieGenres", "tvshowGenres"],
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
