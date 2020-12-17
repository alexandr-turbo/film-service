<template>
  <div v-if="type1.length">
    <div class="home-slick-template-title">
      {{ type | replaceLodashToSpace }}
    </div>
    <slick class="slick" ref="slick" :options="slickOptions">
      <div v-for="item in type1" :key="item.id">
        <HomeCoverTemplate :item="item" :genres="genres" :filmType="filmType" />
      </div>
    </slick>
  </div>
</template>

<script>
import axios from "axios";
import Slick from "vue-slick";
import HomeCoverTemplate from "../components/HomeCoverTemplate.vue";

export default {
  data() {
    return {
      type1: [],
      slickOptions: {
        slidesToShow: 7,
        infinite: true,
        draggable: false,
        lazyLoad: "ondemand",
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 6,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 684,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 540,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },
  components: {
    HomeCoverTemplate,
    Slick,
  },
  props: ["type", "genres", "filmType"],
  created() {
    this.getFilms();
  },
  watch: {
    filmType() {
      this.type1 = [];
      this.getFilms();
    },
  },
  methods: {
    async getFilms() {
      await axios
        .get(
          `https://api.themoviedb.org/3/${this.filmType}/${this.type}?api_key=f943d3d10cc39fd734122d69efabbacb`
        )
        .then((response) => {
          this.type1 = response.data.results;
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
.home-slick-template-title {
  margin-top: 50px;
  text-transform: uppercase;
}
</style>
