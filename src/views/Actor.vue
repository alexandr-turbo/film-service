<template>
  <div class="actor">
    <div v-if="actor">
      <div class="container">
        <ActorInfoTemplate :actor="actor" />
        <div class="actor__buttons">
          <button
            class="actor__switch-button"
            v-if="roles.length"
            @click="cast = true"
          >
            {{ 'actor-cast' | localize }}
          </button>
          <button
            class="actor__switch-button"
            v-if="crews.length"
            @click="cast = false"
          >
            {{ 'actor-crew' | localize }}
          </button>
        </div>
        <template v-if="cast">
          <div class="actor__title">{{ 'actor-cast' | localize }}</div>
          <div v-for="(role, index) in lazyRolesArray" :key="index">
            <ActorCastCrewTemplate
              v-if="role && role.media_type"
              :arr="role"
              :index="index"
              :genres="role.media_type === 'movie' ? movieGenres : tvshowGenres"
            />
          </div>
        </template>
        <template v-if="!cast">
          <div class="actor__title">{{ 'actor-crew' | localize }}</div>
          <div v-for="(crew, index) in lazyCrews" :key="index">
            <ActorCastCrewTemplate
              v-if="crew && crew.media_type"
              :arr="crew"
              :index="index"
              :genres="crew.media_type === 'movie' ? movieGenres : tvshowGenres"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import axios from 'axios';
import ActorInfoTemplate from '../components/ActorInfoTemplate.vue';
import ActorCastCrewTemplate from '../components/ActorCastCrewTemplate.vue';
import { globalAPIMovieDBAddress } from '@/main.ts';
import { IActor } from '@/interfaces/IActor';
import { IGenre } from '@/interfaces/IGenre';
import { IRole } from '@/interfaces/IRole';
import { ICrew } from '@/interfaces/ICrew';

const ROLES_ONLOAD_COUNT = 5;
const CREWS_ONLOAD_COUNT = 5;

@Component({
  components: {
    ActorInfoTemplate,
    ActorCastCrewTemplate,
  },
})
export default class Film extends Vue {
  globalAPIMovieDBAddress = globalAPIMovieDBAddress;
  cast: boolean = true;
  actor: IActor | null = null;
  movieGenres: Array<IGenre> = [];
  tvshowGenres: Array<IGenre> = [];
  roles: Array<IRole> = [];
  crews: Array<ICrew> = [];
  lazyRolesArray: Array<IRole> = [];
  lazyCrews: Array<ICrew> = [];
  scrollHeight: number = 0;
  rolesLoadedCount: number = 0;
  crewsLoadedCount: number = 0;
  key: string = process.env.VUE_APP_MOVIEDB;
  locale: string = '';

  @Watch('$store.getters.locale')
  localeWatcher() {
    this.changeLocale();
  }

  mounted() {
    window.addEventListener('scroll', this.onScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

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
      (this.scrollHeight -
        document.documentElement.clientHeight -
        window.pageYOffset <
        340 &&
        document.documentElement.clientWidth >= 1024) ||
      (this.scrollHeight -
        document.documentElement.clientHeight -
        window.pageYOffset <
        540 &&
        document.documentElement.clientWidth < 1024 &&
        document.documentElement.clientWidth >= 480) ||
      (this.scrollHeight -
        document.documentElement.clientHeight -
        window.pageYOffset <
        825 &&
        document.documentElement.clientWidth < 480 &&
        this.cast === true)
    ) {
      for (; this.rolesLoadedCount < this.roles.length; ) {
        this.lazyRolesArray.push(this.roles[this.rolesLoadedCount]);
        this.rolesLoadedCount++;
        return;
      }
    }
    if (
      (this.scrollHeight -
        document.documentElement.clientHeight -
        window.pageYOffset <
        340 &&
        document.documentElement.clientWidth >= 1024) ||
      (this.scrollHeight -
        document.documentElement.clientHeight -
        window.pageYOffset <
        540 &&
        document.documentElement.clientWidth < 1024 &&
        document.documentElement.clientWidth >= 480) ||
      (this.scrollHeight -
        document.documentElement.clientHeight -
        window.pageYOffset <
        825 &&
        document.documentElement.clientWidth < 480 &&
        this.cast === false)
    ) {
      for (; this.crewsLoadedCount < this.crews.length; ) {
        this.lazyCrews.push(this.crews[this.crewsLoadedCount]);
        this.crewsLoadedCount++;
        return;
      }
    }
  }
  async getCastCrew() {
    await axios
      .get(
        `${globalAPIMovieDBAddress}/3${this.$route.path}/combined_credits?api_key=${this.key}&language=${this.locale}`
      )
      .then(response => {
        if (response.data.cast) {
          this.roles = response.data.cast;
        }
        if (response.data.crew) {
          this.crews = response.data.crew;
        }
        for (; this.rolesLoadedCount < ROLES_ONLOAD_COUNT; ) {
          this.lazyRolesArray.push(this.roles[this.rolesLoadedCount]);
          this.rolesLoadedCount++;
        }
        for (; this.crewsLoadedCount < CREWS_ONLOAD_COUNT; ) {
          this.lazyCrews.push(this.crews[this.crewsLoadedCount]);
          this.crewsLoadedCount++;
        }
      });
  }
  async getActor() {
    await axios
      .get(
        `${globalAPIMovieDBAddress}/3${this.$route.path}?api_key=${this.key}&language=${this.locale}`
      )
      .then(response => {
        this.actor = response.data;
      });
  }

  async changeLocale() {
    (this.$root.$emit as any)('isLoading', true);
    this.locale = this.$store.getters.locale;
    // this.cast = [];
    // this.crew = [];
    this.lazyRolesArray = [];
    this.lazyCrews = [];
    this.rolesLoadedCount = 0;
    this.crewsLoadedCount = 0;
    let p1 = await this.getCastCrew();
    this.actor = null;
    let p2 = await this.getActor();
    await this.$store.dispatch('loadMovieGenres');
    this.movieGenres = this.$store.getters.MovieGenres;
    await this.$store.dispatch('loadTVShowsGenres');
    this.tvshowGenres = this.$store.getters.TVShowGenres;
    Promise.all([p1, p2]).then((this.$root.$emit as any)('isLoading', false));
  }

  async created() {
    this.locale = this.$store.getters.locale;
    let p1 = await this.getCastCrew();
    let p2 = await this.getActor();
    this.movieGenres = this.$store.getters.MovieGenres;
    this.tvshowGenres = this.$store.getters.TVShowGenres;
    Promise.all([p1, p2]).then((this.$root.$emit as any)('isLoading', false));
  }
}
</script>

<style scoped>
.actor {
  background: var(--main-bg);
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
  cursor: pointer;
  display: block;
  font-family: 'Alegreya Sans', sans-serif;
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
