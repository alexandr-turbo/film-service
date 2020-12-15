<template>
  <div>
    <div class="film-actors-slick-template__title">cast</div>
    <slick class="slick" ref="slick" :options="slickOptions_cast">
      <div v-for="item in cast" :key="item.id">
        <FilmActorCoverTemplate :item="item" />
      </div>
    </slick>
  </div>
</template>
<script>
import Slick from "vue-slick";
import FilmActorCoverTemplate from "../components/FilmActorCoverTemplate.vue";
export default {
  data() {
    return {
      slickOptions_cast: {
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
    Slick,
    FilmActorCoverTemplate,
  },
  props: ["cast"],
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
.film-actors-slick-template__title {
  text-transform: uppercase;
}
</style>
