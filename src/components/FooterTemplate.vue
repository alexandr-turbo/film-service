<template>
  <div class="footer-template">
    <div class="container">
      <div class="footer-template__links-row">
        <div class="footer-template__links-column">
          <div class="footer-template__links-title">
            <img
              class="footer-template__link-img"
              src="../assets/explore.svg"
            />
            <div>{{ explore }}</div>
          </div>
          <router-link to="/" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-home' | localize }}
            </div>
          </router-link>
          <router-link
            to="/discover?mediatype=movie&sort_by=popularity.desc&vote_average=&with_people=&with_genres=&year=&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">
              {{ 'footer-template-discover' | localize }}
            </div>
          </router-link>
        </div>
        <div class="footer-template__links-column">
          <div class="footer-template__links-title">
            <img class="footer-template__link-img" src="../assets/movies.svg" />
            <div>{{ 'footer-template-movies' | localize }}</div>
          </div>
          <router-link to="/search?top_rated_movies&page=1" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-top-rated-movies' | localize }}
            </div>
          </router-link>
          <router-link to="/search?upcoming_movies&page=1" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-upcoming-movies' | localize }}
            </div>
          </router-link>
          <router-link to="/search?now_playing_movies&page=1" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-now-playing-movies' | localize }}
            </div>
          </router-link>
          <router-link to="/search?popular_movies&page=1" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-popular-movies' | localize }}
            </div>
          </router-link>
        </div>
        <div class="footer-template__links-column">
          <div class="footer-template__links-title">
            <img class="footer-template__link-img" src="../assets/tv.svg" />
            <div>{{ 'footer-template-tvshows' | localize }}</div>
          </div>
          <router-link to="/search?popular_tv_shows&page=1" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-popular-tvshows' | localize }}
            </div>
          </router-link>
          <router-link to="/search?top_rated_tv_shows&page=1" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-top-rated-tvshows' | localize }}
            </div>
          </router-link>
          <router-link to="/search?on_the_air_tv_shows&page=1" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-on-the-air-tvshows' | localize }}
            </div>
          </router-link>
          <router-link to="/search?airing_today_tv_shows&page=1" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-airing-today-tvshows' | localize }}
            </div>
          </router-link>
        </div>
        <div class="footer-template__links-column">
          <div class="footer-template__links-title">
            <img class="footer-template__link-img" src="../assets/people.svg" />
            <div>{{ 'footer-template-people' | localize }}</div>
          </div>
          <router-link to="/search?popular_people&page=1" tag="div">
            <div class="footer-template__link-title">
              {{ 'footer-template-popular-people' | localize }}
            </div>
          </router-link>
        </div>
      </div>
      <div class="footer-template__bio">
        <div>
          <div class="footer-template__header">
            <div class="footer-template__title">Film cloud</div>
          </div>
          <div>Code and design by Oleksandr Savostian</div>
          <div>
            {{ 'footer-template-now' | localize }}
            {{ date | dateFilter('datetime') }}
          </div>
        </div>
        <img class="footer-template__db-image" src="@/assets/TMDB.png" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import localize from '@/filters/localize';
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class FooterTemplate extends Vue {
  explore: string = '';
  date: Date = new Date();
  interval: any = null;

  @Watch('$store.getters.locale')
  localeWatcher() {
    this.explore = localize('footer-template-explore');
  }

  mounted() {
    this.explore = localize('footer-template-explore');
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  beforeDestroy() {
    clearInterval(this.interval);
  }
}
</script>
<style scoped>
.footer-template {
  background: var(--secondary-bg);
  color: white;
}

.footer-template__links-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
@media (min-width: 1024px) {
  .footer-template__links-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
  }
}
@media (min-width: 480px) and (max-width: 1023px) {
  .footer-template__links-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    width: 50%;
  }
}
@media (max-width: 479px) {
  .footer-template__links-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }
}

.footer-template__links-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  text-transform: capitalize;
}
.footer-template__link-img {
  height: 30px;
  margin-right: 10px;
}
.footer-template__link-title {
  cursor: pointer;
  margin-bottom: 10px;
  text-transform: capitalize;
}

@media (max-width: 683px) {
  .footer-template__bio {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (min-width: 684px) {
  .footer-template__bio {
    display: flex;
    justify-content: space-between;
  }
}
@media (max-width: 479px) {
  .footer-template__header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
@media (min-width: 480px) {
  .footer-template__header {
    display: flex;
    align-items: center;
  }
}
.footer-template__title {
  text-transform: uppercase;
  font-size: 32px;
}
.footer-template__link {
  text-decoration: none;
  color: white;
  vertical-align: bottom;
  display: inline-block;
  vertical-align: bottom;
  margin-left: 24px;
}
@media (max-width: 479px) {
  .footer-template__link:first-child {
    margin-left: 0;
  }
}
.footer-template__db-image {
  width: 162px;
  height: auto;
  margin: 10px 0;
}
</style>
