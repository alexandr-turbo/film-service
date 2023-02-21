<template>
  <div class="film">
    <div v-if="currentFilm && cast && trailers">
      <div class="film__poster-container">
        <img
          v-if="currentFilm.backdrop_path"
          class="film__poster"
          :src="`${globalImgAddress}1280${currentFilm.backdrop_path}`"
        />
      </div>
      <div class="container">
        <div v-if="genres && genres.length">
          {{ 'film-genres' | localize }}: {{ genres }}
        </div>
        <div v-if="currentFilm.overview">
          <div>{{ 'film-summary' | localize }}</div>
          <div>{{ currentFilm.overview }}</div>
        </div>
        <div v-if="cast.length">
          <SlickTemplate :cast="cast" />
        </div>
        <div v-if="trailers.length">
          <div class="film-trailers-slick-template__title">
            {{ 'film-trailers-slick-template-trailers' | localize }}
          </div>
          <div v-for="trailer in trailers" :key="trailer.id">
            <iframe
              width="100%"
              :height="(iFrameWidth / 16) * 9"
              :src="`https://www.youtube.com/embed/${trailer.key}`"
            />
            <div class="film-trailer-cover-template__trailer-title">
              {{ trailer.name }}
            </div>
          </div>
        </div>
        <div class="film__title" v-if="reviews && reviews.length">
          {{ 'film-reviews' | localize }}
        </div>
        <div v-for="(review, index) in reviews" :key="review.id">
          <FilmReviewTemplate :review="review" :index="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import FilmReviewTemplate from '@/components/FilmReviewTemplate.vue';
import SlickTemplate from '@/components/SlickTemplate.vue';
import { IFilm } from '@/interfaces/IFilm';
import { ICast } from '@/interfaces/ICast';
import { ITrailer } from '@/interfaces/ITrailer';
import { IReview } from '@/interfaces/IReview';
import { globalAPIMovieDBAddress, globalImgAddress } from '@/main';
import FilmService from '@/services/FilmService';
import ActorService from '@/services/ActorService';

@Component({
  components: {
    FilmReviewTemplate,
    SlickTemplate,
  },
})
export default class Film extends Vue {
  globalImgAddress = globalImgAddress;
  globalAPIMovieDBAddress = globalAPIMovieDBAddress;
  key: string = process.env.VUE_APP_MOVIEDB;
  genres: string = '';
  currentFilm: IFilm | null = null;
  cast: Array<ICast> = [];
  trailers: Array<ITrailer> = [];
  reviews: Array<IReview> = [];
  locale: string = '';
  windowWidth: number | null = null;
  iFrameWidth: number | null = null;

  @Prop()
  filmID!: string;

  @Prop()
  filmType!: string;

  @Watch('$store.getters.locale')
  localeWatcher() {
    this.changeLocale();
  }

  async changeLocale() {
    (this.$root.$emit as any)('isLoading', true);
    this.locale = this.$store.getters.locale;
    this.currentFilm = null;
    let p1 = await this.getCurrentFilm();
    this.genres = '';
    this.getGenres();
    this.cast = [];
    let p2 = this.getCast();
    this.trailers = [];
    let p3 = this.getTrailers();
    this.reviews = [];
    let p4 = this.getReviews();
    Promise.all([p1, p2, p3, p4]).then(
      (this.$root.$emit as any)('isLoading', false)
    );
  }

  async getCurrentFilm() {
    await FilmService.fetchFilmByID(this.filmType, this.filmID).then(
      response => {
        this.currentFilm = response;
      }
    );
  }

  getGenres() {
    this.genres = (this.currentFilm as IFilm).genres
      .map(genre => genre.name)
      .join('/');
  }

  async getCast() {
    await FilmService.fetchCastByFilmID(this.filmType, this.filmID).then(
      response => {
        this.cast = response;
        for (let i = 0; i < this.cast.length; i++) {
          ActorService.fetchActor(this.cast[i].id).then(response => {
            this.$set(this.cast[i], 'bio', response.biography);
          });
        }
      }
    );
  }

  async getTrailers() {
    await FilmService.fetchTrailersByFilmID(this.filmType, this.filmID).then(
      response => {
        this.trailers = response;
      }
    );
  }

  async getReviews() {
    await FilmService.fetchReviewsByFilmID(this.filmType, this.filmID).then(
      response => {
        this.reviews = response;
      }
    );
  }

  getWindowWidth() {
    this.windowWidth = document.documentElement.clientWidth;
    this.windowWidth > 479
      ? (this.iFrameWidth = this.windowWidth * 0.8)
      : (this.iFrameWidth = this.windowWidth * 0.9);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth);
  }

  async mounted() {
    this.locale = this.$store.getters.locale;
    let p1 = await this.getCurrentFilm();
    this.getGenres();
    let p2 = await this.getCast();
    let p3 = await this.getTrailers();
    let p4 = await this.getReviews();
    Promise.all([p1, p2, p3, p4]).then(
      (this.$root.$emit as any)('isLoading', false)
    );
    // this.$nextTick(function() {
    window.addEventListener('resize', this.getWindowWidth);
    this.getWindowWidth();
    // });
  }
}
</script>

<style scoped>
.film {
  background: var(--main-bg);
}
.film__poster-container {
  overflow: hidden;
  max-height: calc(100vh - 80px);
  max-width: 100vw;
}
.film__poster {
  height: 100%;
  width: 100%;
}
.film__title {
  margin-top: 50px;
  text-transform: uppercase;
}
@media (max-width: 539px) {
  .film__title {
    text-align: center;
  }
}
.film-trailers-slick-template__title {
  margin-top: 50px;
  margin-bottom: 20px;
  text-transform: uppercase;
}
@media (max-width: 539px) {
  .film-trailers-slick-template__title {
    text-align: center;
    margin-bottom: 20px;
  }
}
.film-trailer-cover-template__trailer-title {
  text-align: center;
  margin: 10px auto 50px;
}
</style>
