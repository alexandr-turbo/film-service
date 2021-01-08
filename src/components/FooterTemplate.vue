<template>
  <div class="footer-template">
    <div class="container">
      <div class="footer-template__links-row">
        <div class="footer-template__links-column">
          <div class="footer-template__links-title">
            <img class="footer-template__link-img" src="../assets/explore.svg">
            <div>Explore</div>
          </div>
          <router-link
            to="/"
            tag="div"
          >
            <div class="footer-template__link-title">Home</div>
          </router-link>
          <router-link
            to="/discover?mediatype=movie&sort_by=popularity.desc&vote_average.gte=&with_people=&with_genres=&year=&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">Discover</div>
          </router-link>
        </div>
        <div class="footer-template__links-column">
          <div class="footer-template__links-title">
            <img class="footer-template__link-img" src="../assets/movies.svg">
            <div>Movies</div>
          </div>
          <router-link
            to="/search?top_rated_movies&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">Top rated movies</div>
          </router-link>
          <router-link
            to="/search?upcoming_movies&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">Upcoming movies</div>
          </router-link>
          <router-link
            to="/search?now_playing_movies&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">Now playing movies</div>
          </router-link>
          <router-link
            to="/search?popular_movies&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">Popular movies</div>
          </router-link>
        </div>
        <div class="footer-template__links-column">
          <div class="footer-template__links-title">
            <img class="footer-template__link-img" src="../assets/tv.svg">
            <div>TV</div>
          </div>
          <router-link
            to="/search?popular_tv_shows&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">Popular TV shows</div>
          </router-link>
          <router-link
            to="/search?top_rated_tv_shows&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">Top rated TV shows</div>
          </router-link>
          <router-link
            to="/search?on_the_air_tv_shows&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">On the air TV shows</div>
          </router-link>
          <router-link
            to="/search?airing_today_tv_shows&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">Airing today TV shows</div>
          </router-link>
        </div>
        <div class="footer-template__links-column">
          <div class="footer-template__links-title">
            <img class="footer-template__link-img" src="../assets/people.svg">
            <div>People</div>
          </div>
          <router-link
            to="/search?popular_people&page=1"
            tag="div"
          >
            <div class="footer-template__link-title">Popular people</div>
          </router-link>
        </div>
      </div>
      <!-- <div class="footer-template__bio">
        <div>
          <div class="footer-template__header">
            <div class="footer-template__title">Film cloud</div>
            <div class="footer-template__links">
              <router-link class="footer-template__link" to="/">
                <div>Home</div>
              </router-link>
              <router-link
                class="footer-template__link"
                to="/discover?mediatype=movie&sort_by=popularity.desc&vote_average.gte=&with_people=&with_genres=&year=&page=1"
              >
                <div>Discover</div>
              </router-link>
            </div>
          </div>
          <div>
            Code and design by Aleksandr Savostian
          </div>
        </div>
        <img class="footer-template__db-image" src="@/assets/TMDB.png" />
      </div> -->
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.footer-template {
  background: var(--secondary-bg);
  color: white;
}

.footer-template__links-row {
  display: flex;
  justify-content: space-between;
}
.footer-template__links-column {
  display: flex;
  flex-direction: column;
}
.footer-template__links-title {
  display: flex;
  align-items: center;
}
.footer-template__link-img {
  height: 30px;
}
.footer-template__link-title {
  cursor: pointer;
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
