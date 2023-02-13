<template>
  <div class="home">
    <HomeUpperSlickTemplate
      :genres="genres"
      :popularMoviesArray="popularMoviesArray"
    />
    <div class="container">
      <div class="home__buttons">
        <button class="home__switch-button" @click="switchType('movie')">
          {{ 'home-movies' | localize }}
        </button>
        <button class="home__switch-button" @click="switchType('tv')">
          {{ 'home-tvshows' | localize }}
        </button>
      </div>
      <div
        v-for="(filmSlickTitle, index) in filmSlickTitlesArray"
        :key="filmSlickTitle.id"
      >
        <SlickTemplate
          :filmsArray="filmsArrays[index]"
          :filmSlickTitle="filmSlickTitle"
          :genres="genres"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import HomeUpperSlickTemplate from '../components/HomeUpperSlickTemplate.vue';
import SlickTemplate from '../components/SlickTemplate.vue';
import axios from 'axios';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { globalAPIMovieDBAddress } from '@/main.ts';

@Component({
  components: {
    HomeUpperSlickTemplate,
    SlickTemplate,
  },
})
export default class Home extends Vue {
  globalAPIMovieDBAddress = globalAPIMovieDBAddress;
  key: string = process.env.VUE_APP_MOVIEDB;
  filmsArrays: any = [];
  popularMoviesArray: any = [];
  filmType: string = 'movie';
  genres: any = [];
  tvshowSlickArr: Array<string> = [
    'airing_today',
    'popular',
    'on_the_air',
    'top_rated',
  ];
  movieSlickArr: Array<string> = [
    'upcoming',
    'popular',
    'now_playing',
    'top_rated',
  ];
  filmSlickTitlesArray: any = [];
  temp: any = [];
  locale: string = '';

  async created() {
    this.locale = this.$store.getters.locale;
    if (this.$store.getters.MovieGenres.length) {
      this.genres = this.$store.getters.MovieGenres;
    }
    this.filmSlickTitlesArray = this.movieSlickArr;
    let p1 = await this.getPopularFilms();
    let p2 = await this.getFilms();
    Promise.all([p1, p2]).then((this.$root.$emit as any)('isLoading', false));
  }
  @Watch('$store.getters.locale')
  localeWatcher() {
    this.changeLocale();
  }

  @Watch('filmType')
  filmTypeWatcher() {
    this.popularMoviesArray = [];
    this.getPopularFilms();
    this.filmsArrays = [];
    this.getFilms();
  }
  async changeLocale() {
    (this.$root.$emit as any)('isLoading', true);
    this.locale = this.$store.getters.locale;
    this.genres = [];
    this.popularMoviesArray = [];
    let p1 = await this.getPopularFilms();
    this.filmsArrays = [];
    let p2 = await this.getFilms();
    if (this.filmType === 'movie') {
      await this.$store.dispatch('loadMovieGenres');
      this.filmSlickTitlesArray = this.movieSlickArr;
      this.genres = this.$store.getters.MovieGenres;
    } else if (this.filmType === 'tv') {
      await this.$store.dispatch('loadTVShowsGenres');
      this.filmSlickTitlesArray = this.tvshowSlickArr;
      this.genres = this.$store.getters.TVShowGenres;
    }
    Promise.all([p1, p2]).then((this.$root.$emit as any)('isLoading', false));
  }

  async getPopularFilms() {
    await axios
      .get(
        `${globalAPIMovieDBAddress}/3/${this.filmType}/popular?api_key=${this.key}&language=${this.locale}`
      )
      .then(response => {
        this.popularMoviesArray = response.data.results;
        for (let i = 0; i < this.popularMoviesArray.length; i++) {
          this.$set(this.popularMoviesArray[i], 'media_type', this.filmType);
        }
      });
  }

  async getFilms() {
    for (let i = 0; i < this.filmSlickTitlesArray.length; i++) {
      await axios
        .get(
          `${globalAPIMovieDBAddress}/3/${this.filmType}/${this.filmSlickTitlesArray[i]}?api_key=${this.key}&language=${this.locale}`
        )
        .then(response => {
          this.temp = response.data.results;
          for (let i = 0; i < this.temp.length; i++) {
            this.$set(this.temp[i], 'media_type', this.filmType);
          }
          this.filmsArrays.push(this.temp);
        });
    }
  }

  switchType(type: string) {
    this.filmType = type;
    if (type === 'tv') {
      this.genres = this.$store.getters.TVShowGenres;
      this.filmSlickTitlesArray = this.tvshowSlickArr;
    } else if (type === 'movie') {
      this.genres = this.$store.getters.MovieGenres;
      this.filmSlickTitlesArray = this.movieSlickArr;
    }
  }
}
</script>

<style scoped>
.home {
  background: var(--main-bg);
}
.home__buttons {
  display: flex;
  justify-content: center;
}
.home__switch-button {
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
</style>
