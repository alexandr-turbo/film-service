<template>
  <!-- <div v-if="popular1.length"> -->
  <div v-if="popular.length">
    <slick class="slick" ref="slick" :options="slickOptionsUpper">
      <!-- <div v-for="item in popular1" :key="item.id"> -->
      <div v-for="item in popular" :key="item.id">
        <router-link
          class="home-upper-slick-template"
          tag="div"
          :to="{
            name: 'film',
            params: { filmID: item.id, filmType: item.media_type },
          }"
        >
          <img
            class="home-upper-slick-template__poster"
            :src="`${globalImgAddress}1280${item.backdrop_path}`"
          />
          <div class="home-upper-slick-template__bio">
            <div class="home-upper-slick-template__title">{{'home-upper-slick-template-title' | localize}}</div>
            <div v-if="item.title || item.name || item.original_title || item.original_name">
              {{ item.title || item.name || item.original_title || item.original_name }}
            </div>
            <!-- <div class="home-upper-slick-template__genres">{{ getCurrentMediaTypeGenresNames(genres1, item.genre_ids) }}</div> -->
            <div class="home-upper-slick-template__genres">{{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}</div>
          </div>
        </router-link>
      </div>
    </slick>
  </div>
</template>

<script>
import Slick from "vue-slick";
// import { Bus } from '@/main'
export default {
  data() {
    return {
      slickOptionsUpper: {
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        draggable: false,
        lazyLoad: "ondemand",
      },
      // genres1: [],
      // popular1: {}
    };
  },
  props: ["genres", "popular"],
  components: {
    Slick,
  },
  // created() {
  //   this.genres1 = this.genres
  //   this.popular1 = this.popular
  // },
  // mounted() {
  //   this.genres1 = this.genres
  //   this.popular1 = this.popular
  //   Bus.$on('changeLocale', () => this.changeLocale())
  // },
  // methods: {
  //   changeLocale() {
  //     this.genres1 = []
  //     this.genres1 = this.genres
  //     this.popular1 = {}
  //     this.popular1 = this.popular
  //   }
  // }
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
  left: 10%;
  bottom: 10%;
  color: white;
}
.home-upper-slick-template__title {
  text-transform: uppercase;
}
.home-upper-slick-template__genres {
  text-transform: capitalize;
}
</style>
