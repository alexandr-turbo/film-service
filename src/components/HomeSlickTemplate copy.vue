<template>
  <div v-if="type1 && type1.length">
    <div class="home-slick-template__title">
      {{ type | replaceAllToSpace }}
    </div>
    <slick class="slick" ref="slick" :options="slickOptions">
      <div v-for="item in type1" :key="item.id">
        <CoverTemplate2 :item="item" :genres="genres" />
      </div>
    </slick>
  </div>
</template>

<script>
import Slick from "vue-slick";
import CoverTemplate2 from "../components/CoverTemplate2.vue";

export default {
  data() {
    return {
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
    CoverTemplate2,
    Slick,
  },
  props: ["type", "genres", "type1"],
};
</script>
<style scoped>
.home-slick-template__title {
  margin-top: 50px;
  text-transform: uppercase;
}
@media (max-width: 539px) {
  .home-slick-template__title {
    text-align: center;
  }
}
</style>
