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
          <div v-for="(role, index) in lazyRoles" :key="index">
            <ActorCastTemplate
              :role="role"
              :index="index"
              :genres="role.media_type === 'movie' ? movieGenres : tvshowGenres"
            />
          </div>
        </template>
        <template v-if="!cast">
          <div class="actor__title">Crew</div>
          <div v-for="(crew, index) in lazyCrews" :key="index">
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
const ROLES_ONLOAD_COUNT = 5
const CREWS_ONLOAD_COUNT = 5
export default {
  data: () => ({
    cast: true,
    actor: null,
    movieGenres: null,
    tvshowGenres: null,
    roles: [],
    crews: [],
    lazyRoles: [],
    lazyCrews: [],
    scrollHeight: 0,
    rolesLoadedCount: 0,
    crewsLoadedCount: 0,
    key: process.env.VUE_APP_MOVIEDB,
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
      if (
        this.scrollHeight -
          document.documentElement.clientHeight -
          window.pageYOffset <
          175 &&
        this.cast === true
      ) {
        for (; this.rolesLoadedCount < this.roles.length; ) {
          this.lazyRoles.push(this.roles[this.rolesLoadedCount]);
          this.rolesLoadedCount++;
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
        for (; this.crewsLoadedCount < this.crews.length; ) {
          this.lazyCrews.push(this.crews[this.crewsLoadedCount]);
          this.crewsLoadedCount++;
          return;
        }
      }
    },
  },
  async created() {
    let p1 = await axios
      .get(
        `${this.globalAPIMovieDBAddress}/3${this.$route.path}/combined_credits?api_key=${this.key}`
      )
      .then((response) => {
        if (response.data.cast) {
          this.roles = response.data.cast;
        }
        if (response.data.crew) {
          this.crews = response.data.crew;
        }
        for (; this.rolesLoadedCount < ROLES_ONLOAD_COUNT; ) {
          this.lazyRoles.push(this.roles[this.rolesLoadedCount]);
          this.rolesLoadedCount++;
        }
        for (; this.crewsLoadedCount < CREWS_ONLOAD_COUNT; ) {
          this.lazyCrews.push(this.crews[this.crewsLoadedCount]);
          this.crewsLoadedCount++;
        }
      });
    let p2 = await axios
      .get(
        `${this.globalAPIMovieDBAddress}/3${this.$route.path}?api_key=${this.key}`
      )
      .then((response) => {
        this.actor = response.data;
      });
    this.movieGenres = this.$store.state.MovieGenres;
    this.tvshowGenres = this.$store.state.TVShowGenres;
    Promise.all([p1, p2]).then(this.$root.loading = false)
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
