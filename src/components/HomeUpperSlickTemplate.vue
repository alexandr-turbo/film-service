<template>
  <div v-if="popular.length">
    <slick class="slick" ref="slick" :options="slickOptionsUpper">
      <div v-for="item in popular" :key="item.id">
        <router-link
          class="home-upper-slick-template"
          tag="div"
          :to="{
            name: 'film',
            params: { filmID: item.id, filmType: filmType },
          }"
        >
          <img
            class="home-upper-slick-template__poster"
            :src="`${globalImgAddress}1280${item.backdrop_path}`"
          />
          <div class="home-upper-slick-template__bio">
            <div class="home-upper-slick-template__title">popular</div>
            <div>
              {{
                filmType === "movie"
                  ? item.original_title
                  : item.original_name
              }}
            </div>
            <div>{{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}</div>
          </div>
        </router-link>
      </div>
    </slick>
  </div>
</template>

<script>
import axios from "axios";
import Slick from "vue-slick";

export default {
  data() {
    return {
      popular: [],
      slickOptionsUpper: {
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        draggable: false,
        lazyLoad: "ondemand",
      },
    };
  },
  props: ["filmType", "genres"],
  components: {
    Slick,
  },
  watch: {
    filmType() {
      this.popular = [];
      this.getPopularFilms();
    },
  },
  created() {
    this.getPopularFilms();
  },
  methods: {
    async getPopularFilms() {
      await axios
        .get(
          `https://api.themoviedb.org/3/${this.filmType}/popular?api_key=f943d3d10cc39fd734122d69efabbacb`
        )
        .then((response) => {
          this.popular = response.data.results;
        });
    },
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },
    reInit() {
      this.$refs.slick.reSlick();
    },
  },
};
</script>
<style scoped>
.home-upper-slick-template {
  overflow: hidden;
  max-height: calc(100vh - 80px);
  max-width: 100vw;
  position: relative;
}
.home-upper-slick-template__poster {
  height: 100%;
  width: 100%;
}
.home-upper-slick-template__bio {
  position: absolute;
  left: 100px;
  bottom: 100px;
  color: white;
  /* margin-left: 100px;
  margin-top: -250px;
  padding-bottom: 250px; */
}
.home-upper-slick-template__title {
  text-transform: uppercase;
}
</style>
