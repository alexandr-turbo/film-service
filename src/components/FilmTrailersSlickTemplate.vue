<template>
  <div>
    <div class="film-trailers-slick-template__title">trailers</div>
    <slick class="slick" ref="slick" :options="slickOptions_trailers">
      <div v-for="item in trailers" v-bind:key="item.id">
        <FilmTrailerCoverTemplate :item="item" />
      </div>
    </slick>
  </div>
</template>
<script>
import Slick from "vue-slick";
import FilmTrailerCoverTemplate from "../components/FilmTrailerCoverTemplate.vue";
export default {
  data() {
    return {
      slickOptions_trailers: {
        slidesToShow: 3,
        infinite: true,
        draggable: false,
        lazyLoad: "ondemand",
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 880,
            settings: {
              slidesToShow: 1,
            },
          }
        ],
      },
    };
  },
  components: {
    Slick, FilmTrailerCoverTemplate
  },
  props: ["trailers"],
  methods: {
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
.film-trailers-slick-template__title {
  text-transform: uppercase;
}
</style>
