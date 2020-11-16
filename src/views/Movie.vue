<template id="about-movie-template">
  <div class="movie">
    <div
      v-if="
        currentmovie &&
          cast &&
          trailers
      "
    >
      <img
        v-if="currentmovie.backdrop_path"
        class="upper-imgs"
        :src="`https://image.tmdb.org/t/p/w1280${currentmovie.backdrop_path}`"
      />
      <div class="container">
        <div>
          Genres: {{genres}}
        </div>
        <div v-if="currentmovie.overview">
          <div class="uppercase left-text">summary</div>
          <div>{{ currentmovie.overview }}</div>
        </div>
        <div v-if="cast.length">
          <MovieActorsSlick :cast="cast" />
          <!-- <div class="uppercase left-text">cast</div>
          <slick class="slick" ref="slick" :options="slickOptions_cast">
            <div v-for="item in cast" :key="item.id">
              <router-link :to="{ name: 'actor', params: { actorID: item.id } }">
                <img
                  v-if="item.profile_path && item.profile_path !== ''"
                  class="actor-image"
                  :title="item.bio"
                  :src="`https://image.tmdb.org/t/p/w92${item.profile_path}`"
                />
                <img v-else class="actor-image" src="../../public/no-image.png" />
              </router-link>
              <h4 class="actor-name">{{ item.name }}</h4>
            </div>
          </slick> -->
        </div>
        <div v-if="trailers.length">
          <MovieTrailersSlick :trailers="trailers" />
          <!-- <div class="uppercase left-text">trailers</div>
          <slick class="slick" ref="slick" :options="slickOptions_trailers">
            <div v-for="item in trailers" v-bind:key="item.id">
              <div class="iframe">
                <iframe
                  class="trailer"
                  :src="`https://www.youtube.com/embed/${item.key}`"
                ></iframe>
              </div>
              <h4 class="trailer-name">{{ item.name }}</h4>
            </div>
          </slick> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import Slick from "vue-slick";
import MovieActorsSlick from "../components/MovieActorsSlick.vue";
import MovieTrailersSlick from "../components/MovieTrailersSlick.vue";
export default {
  data() {
    return {
      genres: null,
      currentmovie: null,
      cast: null,
      trailers: null,
      // slickOptions_cast: {
      //   slidesToShow: 5,
      //   infinite: true,
      //   arrows: true,
      //   draggable: false,
      // },
      // slickOptions_trailers: {
      //   slidesToShow: 3,
      //   infinite: true,
      //   arrows: true,
      //   draggable: false,
      // },
    };
  },
  components: {
    MovieActorsSlick,
    MovieTrailersSlick
  },
  props: ["movieID", "movieType"],
  async created() {
    axios
      .get(
        `https://api.themoviedb.org/3/${this.movieType}/${this.movieID}?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.currentmovie = response.data;
        this.genres = this.currentmovie.genres.map(el => el.name).join('/')
      }),
    await axios
      .get(
        `https://api.themoviedb.org/3/${this.movieType}/${this.movieID}/credits?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.cast = response.data.cast;
        for (let i = 0; i < this.cast.length; i++) {
          axios
            .get(
              `https://api.themoviedb.org/3/person/${this.cast[i].id}?api_key=f943d3d10cc39fd734122d69efabbacb`
            )
            .then((response) => {
              this.cast[i].bio = response.data.biography;
            })
        }
      }),
    axios
      .get(
        `https://api.themoviedb.org/3/${this.movieType}/${this.movieID}/videos?api_key=f943d3d10cc39fd734122d69efabbacb`
      )
      .then((response) => {
        this.trailers = response.data.results;
      })
  },
  // methods: {
  //   next() {
  //     this.$refs.slick.next();
  //   },
  //   prev() {
  //     this.$refs.slick.prev();
  //   },
  //   reInit() {
  //     // Helpful if you have to deal with v-for to update dynamic lists
  //     this.$refs.slick.reSlick();
  //   },
  // },
};
</script>

<style scoped>
img.upper-imgs {
  margin: 0;
  padding: 0;
  height: auto;
  width: 100vw;
}
.uppercase {
  text-transform: uppercase;
}
.left-text {
  text-align: left;
}
.upper-text {
  text-align: left;
  margin-left: 100px;
  margin-top: -350px;
  padding-bottom: 50px;
}
.white-text {
  color: white;
}
.container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
}
.actor-image {
  border-radius: 5px;
  height: 190px;
  width: auto;
  margin-left: auto;
  margin-right: auto;
}
.iframe {
  /* margin-left: auto;
    margin-right: auto; */
  text-align: center;
}
.actor-name,
.trailer-name {
  text-align: center;
}
.uppercase {
  text-transform: uppercase;
}
.left-text {
  text-align: left;
}
/* .movie {
    background: #180844;
  } */
</style>
