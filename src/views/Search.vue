<template>
  <div
    v-if="searchResultPage"
    class="search"
    :class="{ 'search__fixed-footer': !searchResultPage.total_results }"
  >
    <div class="container">
      <div class="search__results-title" v-if="searchResultPage.total_results">
        {{ 'search-results' | localize }} {{ searchQuery | replaceAllToSpace }}
      </div>
      <div class="search__results" v-if="searchResultPage.total_results">
        <div
          class="search__result"
          v-for="item in searchResultPage.results"
          :key="item.id"
        >
          <CoverTemplate1
            :searchQuery="searchQuery"
            :item="item"
            :genres="item.media_type === 'movie' ? movieGenres : tvshowGenres"
          />
        </div>
      </div>
      <div class="search__results-title" v-else>
        {{ 'search-nothing-found' | localize }}
      </div>
      <div v-if="searchResultPage.page" class="search__page-buttons">
        <button
          class="search__page-button search__page-button--previous"
          v-if="searchResultPage.page > 1"
          @click="getPreviousPageSearchResults()"
        >
          {{ 'search-previous' | localize }}
        </button>
        <button
          class="search__page-button search__page-button--next"
          v-if="searchResultPage.page < searchResultPage.total_pages"
          @click="getNextPageSearchResults()"
        >
          {{ 'search-next' | localize }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import CoverTemplate1 from '@/components/CoverTemplate1.vue';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { globalAPIMovieDBAddress } from '@/main';
import { IGenre } from '@/interfaces/IGenre';
import { ISearchResult } from '@/interfaces/ISearchResult';
import FilmService from '@/services/FilmService';
import ActorService from '@/services/ActorService';
import { ISearchFilm } from '@/interfaces/ISearchFilm';
import { ISearchTVShow } from '@/interfaces/ISearchTVShow';

@Component({
  components: {
    CoverTemplate1,
  },
})
export default class Search extends Vue {
  globalAPIMovieDBAddress = globalAPIMovieDBAddress;
  searchResultPage: ISearchResult | null = null;
  filteredSearchResults: ISearchResult | null = null;
  movieGenres: Array<IGenre> = [];
  tvshowGenres: Array<IGenre> = [];
  genres: Array<IGenre> = [];
  searchQuery: string = '';
  pageNumber: number = 1;
  key: string = process.env.VUE_APP_MOVIEDB;
  locale: string = '';

  @Watch('$route')
  routeWatcher() {
    if (+this.$route.query.page && Object.keys(this.$route.query).length > 1) {
      this.getSearchQuery();
      this.getPageNumber();
      this.getPageSearchResults(this.searchQuery, this.pageNumber);
    } else {
      this.searchResultPage = null;
      (this.$root.$emit as any)('isLoading', false);
    }
  }

  @Watch('$store.getters.locale')
  localeWatcher() {
    this.changeLocale();
  }
  created() {
    this.locale = this.$store.getters.locale;
    if (
      Object.values(this.$route.query)[1] &&
      Object.keys(this.$route.query).length > 1
    ) {
      this.getSearchQuery();
      this.getPageNumber();
      this.getPageSearchResults(this.searchQuery, this.pageNumber);
    } else {
      this.searchResultPage = null;
      (this.$root.$emit as any)('isLoading', false);
    }
    this.movieGenres = this.$store.getters.MovieGenres;
    this.tvshowGenres = this.$store.getters.TVShowGenres;
  }

  async changeLocale() {
    (this.$root.$emit as any)('isLoading', true);
    this.locale = this.$store.getters.locale;
    if (+this.$route.query.page && Object.keys(this.$route.query).length > 1) {
      this.getSearchQuery();
      this.getPageNumber();
      this.getPageSearchResults(this.searchQuery, this.pageNumber);
    } else {
      (this.$root.$emit as any)('isLoading', false);
    }
    await this.$store.dispatch('fetchMovieGenres');
    this.movieGenres = this.$store.getters.MovieGenres;
    await this.$store.dispatch('fetchTVShowsGenres');
    this.tvshowGenres = this.$store.getters.TVShowGenres;
  }

  getSearchQuery() {
    this.searchQuery = Object.keys(this.$route.query)[0];
  }

  getPageNumber() {
    this.pageNumber = +this.$route.query.page;
  }

  increasePageNumber() {
    this.pageNumber = +this.$route.query.page;
    this.pageNumber++;
  }

  decreasePageNumber() {
    this.pageNumber = +this.$route.query.page;
    this.pageNumber--;
  }

  async getFilmsList(query: string, page: number) {
    let mediaTypeType,
      mediaType: string = '';
    if (query.includes('movies')) {
      mediaTypeType = query.slice(0, query.indexOf('movies') - 1);
      mediaType = 'movie';
    } else if (query.includes('tv_shows')) {
      mediaTypeType = query.slice(0, query.indexOf('tv_shows') - 1);
      mediaType = 'tv';
    }
    await FilmService.searchFilms(
      mediaType,
      mediaTypeType as string,
      page
    ).then(response => {
      this.searchResultPage = response;
      (
        (this.searchResultPage as ISearchResult).results as Array<
          ISearchFilm | ISearchTVShow
        >
      ).forEach(result => (result.media_type = mediaType));
    });
  }

  async getPopularPeopleList(page: number) {
    await ActorService.fetchPopularPeople(page).then(response => {
      this.searchResultPage = response;
      for (
        let i = 0;
        i < (this.searchResultPage as ISearchResult).results.length;
        i++
      ) {
        ActorService.fetchActor(
          (this.searchResultPage as ISearchResult).results[i].id
        ).then(response => {
          this.$set(
            (this.searchResultPage as ISearchResult).results[i],
            'bio',
            response.biography
          );
        });
      }
    });
  }

  async getPageSearchResults(query: string, page: number) {
    if (query.includes('movies') || query.includes('tv_shows')) {
      this.getFilmsList(query, page);
    } else if (query.includes('popular_people')) {
      this.getPopularPeopleList(page);
    } else {
      await FilmService.searchFilmsByName(query, page).then(response => {
        this.searchResultPage = response;
      });
    }
    (this.$root.$emit as any)('isLoading', false);
  }

  async getNextPageSearchResults() {
    this.getSearchQuery();
    this.increasePageNumber();
    this.$router.push(
      `${this.$route.path}?${this.searchQuery}&page=${this.pageNumber}`
    );
  }

  async getPreviousPageSearchResults() {
    this.getSearchQuery();
    this.decreasePageNumber();
    this.$router.push(
      `${this.$route.path}?${this.searchQuery}&page=${this.pageNumber}`
    );
  }
}
</script>
<style scoped>
.search {
  background: var(--main-bg);
}
.search__results-title {
  text-align: center;
}
.search__results {
  display: flex;
  flex-wrap: wrap;
}
.search__result {
  display: flex;
  flex-direction: column;
  height: auto;
}
@media (min-width: 1280px) {
  .search__result {
    width: 20%;
  }
}
@media (min-width: 1024px) and (max-width: 1279px) {
  .search__result {
    width: 25%;
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .search__result {
    width: 33%;
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .search__result {
    width: 50%;
  }
}
@media (max-width: 479px) {
  .search__result {
    width: 100%;
  }
}
.search__page-buttons {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}
.search__page-button {
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
.search__page-button--previous::before {
  content: '<<';
}
.search__page-button--next::after {
  content: '>>';
}
.search__fixed-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  height: calc(100vh - 390px); /* 310px - footer, 80px - searchbar */
  width: 100vw;
}
</style>
