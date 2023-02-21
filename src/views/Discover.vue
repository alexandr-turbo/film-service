<template>
  <div class="discover">
    <div class="container">
      <form @submit.prevent="searchRequest">
        <div class="discover__form">
          <div class="discover__form-field-container">
            <div>{{ 'discover-mediatype' | localize }}</div>
            <CSelect
              v-model="media_type"
              :options="mediatypeOptions"
              class="discover__form-field"
              id="media_type"
              label="title"
              track-by="value"
            />
          </div>
          <div class="discover__form-field-container">
            <div>{{ 'discover-sort' | localize }}</div>
            <CSelect
              v-model="sortType"
              :options="sortOptions"
              class="discover__form-field"
              id="sortType"
              label="title"
              track-by="value"
            />
          </div>
          <div class="discover__form-field-container">
            <div>{{ 'discover-min-average-vote' | localize }}</div>
            <text-input
              id="vote"
              v-model="vote"
              class="discover__form-field"
              type="number"
              :placeholder="minAverageVotePlaceholder"
            />
          </div>
          <div
            v-if="media_type.value === 'movie'"
            class="discover__form-field-container"
          >
            <div>{{ 'discover-involved-actor' | localize }}</div>
            <CSelect
              v-model="actor"
              :options="actorsOptions"
              class="discover__form-field"
              @search-change="search"
              id="ajax"
              label="name"
              track-by="name"
              :searchable="true"
            />
          </div>
          <div class="discover__form-field-container">
            <div>{{ 'discover-genre' | localize }}</div>
            <CSelect
              v-model="genre"
              :options="genres"
              class="discover__form-field"
              id="sortType"
              label="name"
              track-by="id"
            />
          </div>
          <div class="discover__form-field-container">
            <div>
              {{
                media_type.value === 'movie'
                  ? 'discover-year'
                  : 'discover-first-airing-date' | localize
              }}
            </div>
            <text-input
              id="year"
              v-model="year"
              class="discover__form-field"
              type="number"
              :placeholder="yearPlaceholder"
            />
          </div>
        </div>
        <div class="discover__form-button-container">
          <button class="discover__form-button" type="submit">
            {{ 'discover-submit' | localize }}
          </button>
        </div>
      </form>
      <div
        class="discover__results"
        v-if="searchResultPage && searchResultPage.total_results"
      >
        <div
          class="discover__result"
          v-for="item in searchResultPage.results"
          :key="item.id"
        >
          <CoverTemplate1 :item="item" />
        </div>
      </div>
      <div class="discover__results-title" v-else>
        {{ 'discover-nothing-found' | localize }}
      </div>
      <div
        v-if="searchResultPage && searchResultPage.page"
        class="discover__page-buttons"
      >
        <button
          class="discover__page-button discover__page-button--previous"
          v-if="searchResultPage && searchResultPage.page > 1"
          @click="getPreviousPageSearchResults()"
        >
          {{ 'discover-previous' | localize }}
        </button>
        <button
          class="discover__page-button discover__page-button--next"
          v-if="
            searchResultPage &&
            searchResultPage.page < searchResultPage.total_pages
          "
          @click="getNextPageSearchResults()"
        >
          {{ 'discover-next' | localize }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import CoverTemplate1 from '../components/CoverTemplate1.vue';
import localize from '@/filters/localize';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { IOption } from '@/interfaces/IOption';
import { IGenre } from '@/interfaces/IGenre';
import { ISearchActor } from '@/interfaces/ISearchActor';
import { ISearchResult } from '@/interfaces/ISearchResult';
import { globalAPIMovieDBAddress } from '@/main';
import TextInput from '@/components/controls/form/TextInput.vue';
import ActorService from '@/services/ActorService';
import DiscoverService from '@/services/DiscoverService';

@Component({
  components: {
    CoverTemplate1,
    TextInput,
  },
})
export default class Discover extends Vue {
  globalAPIMovieDBAddress = globalAPIMovieDBAddress;
  movieSortOptions: Array<IOption> = [];
  tvSortOptions: Array<IOption> = [];
  mediatypeOptions: Array<IOption> = [];
  minAverageVotePlaceholder: string = '';
  yearPlaceholder: string = '';
  year: number | null = null;
  genre: IGenre | null = null;
  people: string = '';
  vote: number | null = null;
  sortType: IOption | null = null;
  media_type: IOption | null = null;
  searchResultPage: ISearchResult | null = null;
  movieGenres: Array<IGenre> = [];
  tvshowGenres: Array<IGenre> = [];
  searchQuery: string = '';
  pageNumber: number = 1;
  fullPath: string = '';
  selectedActorIDFromList: number | null = null;
  selectedGenreID: number | null = null;
  selectedActor: number | null = null;
  selectedVote: string = '';
  routeMediatype: string = '';
  routeSortBy: string = '';
  routeVote: number | null = null;
  routeActorID: number | null = null;
  routeGenreID: number | null = null;
  routeYear: number | null = null;
  routePage: number | null = null;
  key: string = process.env.VUE_APP_MOVIEDB;
  actor: ISearchActor | null = null;
  preventOnCreatedUpdate: boolean = true;
  locale: string = '';
  arr2: Array<string> = [];
  selectedActorID: string = '';
  selectedActorName: string = '';
  actorsOptions: Array<ISearchActor> = [];

  get genres(): Array<IGenre> {
    return (this.media_type as IOption).value === 'movie'
      ? this.$store.getters.MovieGenres
      : this.$store.getters.TVShowGenres;
  }

  get sortOptions() {
    return (this.media_type as IOption).value === 'movie'
      ? this.movieSortOptions
      : this.tvSortOptions;
  }

  // @Watch('media_type')
  // media_typeWatcher() {
  //   if (this.preventOnCreatedUpdate) {
  //     this.preventOnCreatedUpdate = false;
  //     return;
  //   }
  //   this.genre =
  //     this.routeGenreID =
  //     this.selectedGenreID =
  //     this.selectedActorIDFromList =
  //     this.routeActorID =
  //     this.actor =
  //       null;
  //   this.routeSortBy = 'popularity.desc';
  //   this.sortType = this.sortOptions.find(
  //     sortType => sortType.value === this.routeSortBy
  //   ) as IOption;
  // }

  @Watch('$route')
  async routeWatcher() {
    this.getRoutePaths();
    this.getLocalizedSelectsValues();
    if (this.routeMediatype) {
      this.media_type = this.mediatypeOptions.find(
        media_type => media_type.value === this.routeMediatype
      ) as IOption;
    }
    if (this.routeVote) {
      this.vote = this.routeVote;
    } else this.vote = null;
    if (this.routeYear) {
      this.year = this.routeYear;
    } else this.year = null;
    if (this.routeSortBy) {
      this.sortType = this.sortOptions.find(
        sortType => sortType.value === this.routeSortBy
      ) as IOption;
    }
    if (this.routeGenreID) {
      this.genre = this.genres.find(
        genre => genre.id === this.routeGenreID
      ) as IGenre;
    } else this.genre = null;

    if (this.routeActorID) {
      ActorService.fetchSearchActor(this.routeActorID).then(response => {
        this.actor = response;
      });
    } else this.actor = null;
    if (this.isSearchQueryCorrect()) {
      this.getPageSearchResults(
        this.routeMediatype,
        this.routeSortBy,
        this.routeVote as number,
        this.routeActorID as number,
        this.routeGenreID as number,
        this.routeYear as number,
        this.routePage as number
      );
    } else {
      this.searchResultPage = null;
      (this.$root.$emit as any)('isLoading', false);
    }
  }

  @Watch('$store.getters.locale')
  localeWatcher() {
    this.changeLocale();
  }

  async created() {
    this.locale = this.$store.getters.locale;
    this.getRoutePaths();
    this.getLocalizedSelectsValues();
    if (this.routeMediatype) {
      this.media_type = this.mediatypeOptions.find(
        media_type => media_type.value === this.routeMediatype
      ) as IOption;
    }
    if (this.routeVote) {
      this.vote = this.routeVote;
    }
    if (this.routeYear) {
      this.year = this.routeYear;
    }
    if (this.routeSortBy) {
      this.sortType = this.sortOptions.find(
        sortType => sortType.value === this.routeSortBy
      ) as IOption;
    }
    if (this.routeGenreID) {
      this.genre = this.genres.find(
        genre => genre.id === this.routeGenreID
      ) as IGenre;
    }
    if (this.routeActorID) {
      await ActorService.fetchSearchActor(this.routeActorID).then(response => {
        this.actor = response;
      });
    }
    if (this.isSearchQueryCorrect()) {
      this.getPageSearchResults(
        this.routeMediatype,
        this.routeSortBy,
        this.routeVote as number,
        this.routeActorID as number,
        this.routeGenreID as number,
        this.routeYear as number,
        this.routePage as number
      );
    } else {
      this.searchResultPage = null;
      (this.$root.$emit as any)('isLoading', false);
    }
  }

  isSearchQueryCorrect() {
    let arr = Object.keys(this.$route.query);
    if (
      this.$route.query.mediatype &&
      this.$route.query.mediatype === 'movie'
    ) {
      this.arr2 = [
        'mediatype',
        'page',
        'sort_by',
        'vote_average',
        'with_genres',
        'with_people',
        'year',
      ];
      return (
        this.arr2.every(i => arr.includes(i)) &&
        this.movieSortOptions.find(
          i => i.value === this.$route.query.sort_by
        ) &&
        +this.$route.query.page
      );
    } else if (
      this.$route.query.mediatype &&
      this.$route.query.mediatype === 'tv'
    ) {
      this.arr2 = [
        'mediatype',
        'page',
        'sort_by',
        'vote_average',
        'with_genres',
        'first_air_date_year',
      ];
      return (
        this.arr2.every(i => arr.includes(i)) &&
        this.tvSortOptions.some(i => i.value === this.$route.query.sort_by) &&
        +this.$route.query.page
      );
    }
  }

  getLocalizedSelectsValues() {
    this.yearPlaceholder = localize('discover-year');
    this.minAverageVotePlaceholder = localize('discover-min-average-vote');
    this.mediatypeOptions = [
      { title: localize('discover-mediatype-movie'), value: 'movie' },
      { title: localize('discover-mediatype-tvshow'), value: 'tv' },
    ];
    this.movieSortOptions = [
      {
        title: localize('discover-popularity-descending'),
        value: 'popularity.desc',
      },
      {
        title: localize('discover-popularity-ascending'),
        value: 'popularity.asc',
      },
      {
        title: localize('discover-release-date-descending'),
        value: 'release_date.desc',
      },
      {
        title: localize('discover-release-date-ascending'),
        value: 'release_date.asc',
      },
      {
        title: localize('discover-revenue-descending'),
        value: 'revenue.desc',
      },
      {
        title: localize('discover-revenue-ascending'),
        value: 'revenue.asc',
      },
      {
        title: localize('discover-vote-average-descending'),
        value: 'vote_average.desc',
      },
      {
        title: localize('discover-vote-average-ascending'),
        value: 'vote_average.asc',
      },
    ];
    this.tvSortOptions = [
      {
        title: localize('discover-popularity-descending'),
        value: 'popularity.desc',
      },
      {
        title: localize('discover-popularity-ascending'),
        value: 'popularity.asc',
      },
      {
        title: localize('discover-first-air-date-descending'),
        value: 'first_air_date.desc',
      },
      {
        title: localize('discover-first-air-date-ascending'),
        value: 'first_air_date.asc',
      },
      {
        title: localize('discover-vote-average-descending'),
        value: 'vote_average.desc',
      },
      {
        title: localize('discover-vote-average-ascending'),
        value: 'vote_average.asc',
      },
    ];
  }

  async changeLocale() {
    this.locale = this.$store.getters.locale;
    this.getRoutePaths();
    this.getLocalizedSelectsValues();
    if (this.routeMediatype) {
      this.media_type = this.mediatypeOptions.find(
        media_type => media_type.value === this.routeMediatype
      ) as IOption;
    }
    if (this.routeVote) {
      this.vote = this.routeVote;
    }
    if (this.routeYear) {
      this.year = this.routeYear;
    }
    if (this.routeSortBy) {
      this.sortType = this.sortOptions.find(
        sortType => sortType.value === this.routeSortBy
      ) as IOption;
    }
    await this.$store.dispatch('fetchMovieGenres');
    this.movieGenres = this.$store.getters.MovieGenres;
    await this.$store.dispatch('fetchTVShowsGenres');
    this.tvshowGenres = this.$store.getters.TVShowGenres;
    if (this.routeGenreID) {
      this.genre = this.genres.find(
        genre => genre.id === this.routeGenreID
      ) as IGenre;
    }
    if (this.routeActorID) {
      await ActorService.fetchSearchActor(this.routeActorID).then(response => {
        this.actor = response;
      });
    }
    if (this.isSearchQueryCorrect()) {
      this.getPageSearchResults(
        this.routeMediatype,
        this.routeSortBy,
        this.routeVote as number,
        this.routeActorID as number,
        this.routeGenreID as number,
        this.routeYear as number,
        this.routePage as number
      );
    } else {
      this.searchResultPage = null;
      (this.$root.$emit as any)('isLoading', false);
    }
  }

  getFullPath() {
    this.fullPath = this.$route.fullPath.split('page=')[0];
  }

  increasePageNumber() {
    this.pageNumber = +this.$route.query.page;
    this.pageNumber++;
  }

  decreasePageNumber() {
    this.pageNumber = +this.$route.query.page;
    this.pageNumber--;
  }

  getRoutePaths() {
    this.routeMediatype = this.$route.query.mediatype as string;
    this.routeSortBy = this.$route.query.sort_by as string;
    this.routeVote = +this.$route.query.vote_average;
    this.routeActorID = +this.$route.query.with_people;
    this.routeGenreID = +this.$route.query.with_genres;
    this.routeYear =
      this.routeMediatype === 'movie'
        ? +this.$route.query.year
        : +this.$route.query.first_air_date_year;
    this.routePage = +this.$route.query.page;
  }

  async search(input: string) {
    this.actorsOptions = await ActorService.searchActor(input).then(
      response => {
        const results = response;
        return results.filter((actor: ISearchActor) => {
          return actor.name.toLowerCase().includes(input.toLowerCase());
        });
      }
    );
    (this.$root.$emit as any)('isLoading', false);
  }

  searchRequest() {
    if (this.genre) {
      this.selectedGenreID = (
        this.genres.find(
          genre => genre.id === (this.genre as IGenre).id
        ) as IGenre
      ).id;
    } else if (!this.genre) {
      this.selectedGenreID = null;
    }
    if ((this.media_type as IOption).value === 'tv') {
      this.selectedActor = null;
    }
    if (
      this.selectedActorIDFromList ||
      (this.actor && (this.actor as ISearchActor).id)
    ) {
      this.selectedActor =
        this.selectedActorIDFromList || (this.actor as ISearchActor).id;
    }
    if ((this.media_type as IOption).value === 'movie') {
      this.$router.push(
        `${this.$route.path}?mediatype=${
          (this.media_type as IOption).value
        }&sort_by=${(this.sortType as IOption).value}&vote_average=${
          this.vote ? this.vote : ''
        }&with_people=${
          this.selectedActor ? this.selectedActor : ''
        }&with_genres=${
          this.selectedGenreID ? this.selectedGenreID : ''
        }&year=${this.year ? this.year : ''}&page=1`
      );
    } else if ((this.media_type as IOption).value === 'tv') {
      this.$router.push(
        `${this.$route.path}?mediatype=${
          (this.media_type as IOption).value
        }&sort_by=${(this.sortType as IOption).value}&vote_average=${
          this.vote ? this.vote : ''
        }&with_genres=${
          this.selectedGenreID ? this.selectedGenreID : ''
        }&first_air_date_year=${this.year ? this.year : ''}&page=1`
      );
    }
  }

  async getPageSearchResults(
    routeMediatype: string,
    routeSortBy: string,
    routeVote: number,
    routeActorID: number,
    routeGenreID: number,
    routeYear: number,
    routePage: number
  ) {
    if (routeMediatype === 'movie') {
      await DiscoverService.fetchDiscoverMovies(
        routeMediatype,
        routeSortBy,
        routeVote,
        routeActorID,
        routeGenreID,
        routeYear,
        routePage
      ).then(response => {
        this.searchResultPage = response;
        if ((this.searchResultPage as ISearchResult).results.length) {
          for (
            let i = 0;
            i < (this.searchResultPage as ISearchResult).results.length;
            i++
          ) {
            this.$set(
              (this.searchResultPage as ISearchResult).results[i],
              'media_type',
              routeMediatype
            );
          }
        }
      });
    } else if (routeMediatype === 'tv') {
      await DiscoverService.fetchDiscoverTVShows(
        routeMediatype,
        routeSortBy,
        routeVote,
        routeGenreID,
        routeYear,
        routePage
      ).then(response => {
        this.searchResultPage = response;
        if ((this.searchResultPage as ISearchResult).results.length) {
          for (
            let i = 0;
            i < (this.searchResultPage as ISearchResult).results.length;
            i++
          ) {
            this.$set(
              (this.searchResultPage as ISearchResult).results[i],
              'media_type',
              routeMediatype
            );
          }
        }
      });
    }
    (this.$root.$emit as any)('isLoading', false);
  }

  getNextPageSearchResults() {
    this.getFullPath();
    this.increasePageNumber();
    this.$router.push(`${this.fullPath}&page=${this.pageNumber}`);
  }

  getPreviousPageSearchResults() {
    this.getFullPath();
    this.decreasePageNumber();
    this.$router.push(`${this.fullPath}&page=${this.pageNumber}`);
  }
}
</script>
<style lang="scss" scoped>
.discover {
  background: var(--main-bg);
}
.discover__form {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.discover__form-field-container {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
@media (min-width: 640px) {
  .discover__form-field-container {
    width: 350px;
  }
}
@media (max-width: 639px) {
  .discover__form-field-container {
    width: 280px;
  }
}

::v-deep .form-control {
  height: 35px;
  border: 1px solid #ced4da;
  box-shadow: none;
}

.discover__form-button-container {
  display: flex;
  justify-content: center;
}
.discover__form-button,
.discover__page-button {
  background: none;
  border: 2px solid var(--main-text-color);
  border-radius: 20px;
  cursor: pointer;
  font-family: 'Alegreya Sans', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.1rem;
  margin: 2rem auto;
  outline: none;
  padding: 0.7rem;
  width: 180px;
}
.discover__results {
  display: flex;
  flex-wrap: wrap;
}
.discover__result {
  display: flex;
  flex-direction: column;
  height: auto;
}
@media (min-width: 1280px) {
  .discover__result {
    width: 20%;
  }
}
@media (min-width: 1024px) and (max-width: 1279px) {
  .discover__result {
    width: 25%;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .discover__result {
    width: 33%;
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .discover__result {
    width: 50%;
  }
}
@media (max-width: 479px) {
  .discover__result {
    width: 100%;
  }
}
.discover__results-title {
  display: flex;
  justify-content: center;
}
.discover__page-buttons {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}
.discover__page-button--previous::before {
  content: '<<';
}
.discover__page-button--next::after {
  content: '>>';
}
</style>
