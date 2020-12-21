<template>
  <div class="actor">
    <div v-if="actor !== null">
      <div class="actor__container">
        <ActorInfoTemplate :actor="actor" />
        <div class="actor__buttons">
          <button class="actor__switch-button" v-if="roles.length" @click="cast = true">Cast</button>
          <button class="actor__switch-button" v-if="crews.length" @click="cast = false">Crew</button>
        </div>
        <template v-if="cast">
          <div class="actor__title">Cast</div>
          <div v-for="(role, index) in roles1" :key="index">
            <ActorCastTemplate
              :role="role"
              :index="index"
              :genres="role.media_type === 'movie' ? movieGenres : tvshowGenres"
            />
          </div>
        </template>
        <template v-if="!cast">
          <div class="actor__title">Crew</div>
          <div v-for="(crew, index) in crews1" :key="index">
            <ActorCrewTemplate
              :crew="crew"
              :index="index"
              :genres="crew.media_type === 'movie' ? movieGenres : tvshowGenres"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ActorInfoTemplate from "../components/ActorInfoTemplate.vue";
import ActorCastTemplate from "../components/ActorCastTemplate.vue";
import ActorCrewTemplate from "../components/ActorCrewTemplate.vue";

export default {
  data: () => ({
    cast: true,
    actor: null,
    movieGenres: null,
    tvshowGenres: null,
    roles: [],
    crews: [],
    roles1: [],
    crews1: [],
    scrollHeight: 0,
    interval: null,
    i: 0,
    j: 0,
  }),
  components: {
    ActorInfoTemplate,
    ActorCastTemplate,
    ActorCrewTemplate,
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      this.scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      console.log(this.scrollHeight -
          document.documentElement.clientHeight -
          window.pageYOffset)
      if (
        this.scrollHeight -
          document.documentElement.clientHeight -
          window.pageYOffset <
          175 &&
        this.cast === true
      ) {
        for (; this.i < this.roles.length; ) {
          this.roles1.push(this.roles[this.i]);
          this.i++;
          return;
        }
      }
      if (
        this.scrollHeight -
          document.documentElement.clientHeight -
          window.pageYOffset <
          175 &&
        this.cast === false
      ) {
        for (; this.j < this.crews.length; ) {
          this.crews1.push(this.crews[this.j]);
          this.j++;
          return;
        }
      }
    },
  },
  async created() {
    axios
      .get(
        `https://api.themoviedb.org/3${this.$route.path}?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.actor = response.data;
      }),
      axios
        .get(
          `https://api.themoviedb.org/3${this.$route.path}/combined_credits?api_key=f943d3d10cc39fd734122d69efabbacb`
        )
        .then((response) => {
          if (response.data.cast) {
            this.roles = response.data.cast;
          }
          if (response.data.crew) {
            this.crews = response.data.crew;
          }
          for (; this.i < 1; ) {
            this.roles1.push(this.roles[this.i]);
            this.i++;
          }
          for (; this.j < 1; ) {
            this.crews1.push(this.crews[this.j]);
            this.j++;
          }
        });
    this.movieGenres = this.$store.state.MovieGenres;
    this.tvshowGenres = this.$store.state.TVShowGenres;
  },
};
</script>

<style scoped>
.actor {
  background: -webkit-linear-gradient(285deg, #251431 0%, #161130 22%);
  background: -o-linear-gradient(285deg, #251431 0%, #161130 22%);
  background: linear-gradient(165deg, #251431 0%, #161130 22%);
  color: #fff;
}
.actor__container {
  padding: 2rem 0;
  margin: 0 auto;
  max-width: 80%;
}
@media (max-width: 479px) {
  .actor__container {
    max-width: 90%;
  }
}
.actor__buttons {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}
.actor__switch-button {
  background: none;
  border: none;
  background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(rgba(255, 86, 132, 0.4)),
      color-stop(68%, rgba(83, 50, 201, 0.4))
    ),
    -webkit-gradient(linear, left top, right top, from(rgba(255, 86, 132, 0.4)), color-stop(68%, rgba(83, 50, 201, 0.4)));
  background-image: -webkit-linear-gradient(
      left,
      rgba(255, 86, 132, 0.4) 0%,
      rgba(83, 50, 201, 0.4) 68%
    ),
    -webkit-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(
            83,
            50,
            201,
            0.4
          )
          68%);
  background-image: -o-linear-gradient(
      left,
      rgba(255, 86, 132, 0.4) 0%,
      rgba(83, 50, 201, 0.4) 68%
    ),
    -o-linear-gradient(left, rgba(255, 86, 132, 0.4) 0%, rgba(83, 50, 201, 0.4)
          68%);
  background-image: linear-gradient(
      90deg,
      rgba(255, 86, 132, 0.4) 0%,
      rgba(83, 50, 201, 0.4) 68%
    ),
    linear-gradient(
      90deg,
      rgba(255, 86, 132, 0.4) 0%,
      rgba(83, 50, 201, 0.4) 68%
    );
  border-image-slice: 1;
  border-left: 3px solid rgba(255, 86, 132, 0.4);
  border-right: 3px solid rgba(83, 50, 201, 0.4);
  border-radius: 10px;
  background-position: 0 0, 0 100%;
  background-repeat: no-repeat;
  background-size: 100% 3px;
  color: #fff;
  cursor: pointer;
  display: block;
  font-family: "Alegreya Sans", sans-serif;
  font-weight: bold;
  letter-spacing: 0.4rem;
  outline: none;
  width: 300px;
  height: 80px;
  margin: 0 10px;
  text-transform: uppercase;
}
.actor__title {
  font-size: 32px;
}
@media (max-width: 539px) {
  .actor__title {
    text-align: center;
  }
}
</style>
