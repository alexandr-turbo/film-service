<template>
  <div>
    <div v-if="cast">
      <div class="slick-template__title">
        {{ "slick-template-cast" | localize }}
      </div>
      <slick class="slick" ref="slick" :options="slickOptions">
        <div v-for="item in cast" :key="item.cast_id">
          <CoverTemplate2 :item="item" />
        </div>
      </slick>
    </div>
    <div v-else-if="filmsArray && filmsArray.length">
      <div class="slick-template__title">
        {{ typeName }}
      </div>
      <slick class="slick" ref="slick" :options="slickOptions">
        <div v-for="item in filmsArray" :key="item.id">
          <CoverTemplate2 :item="item" :genres="genres" />
        </div>
      </slick>
    </div>
  </div>
</template>

<script lang="ts">
import Slick from "vue-slick";
import CoverTemplate2 from "../components/CoverTemplate2.vue";
import localize from "@/filters/localize";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  components: {
    CoverTemplate2,
    Slick,
  },
})
export default class SlickTemplate extends Vue {
  slickOptions = {
    slidesToShow: 7,
    infinite: true,
    draggable: true,
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
  };

  @Prop()
  cast: any;

  @Prop()
  filmSlickTitle: any;

  @Prop()
  genres: any;

  @Prop()
  filmsArray: any;

  get typeName() {
    return localize("slick-template-" + this.filmSlickTitle);
  }
}
</script>
<style scoped>
.slick-template__title {
  margin-top: 50px;
  text-transform: uppercase;
}
@media (max-width: 539px) {
  .slick-template__title {
    text-align: center;
  }
}
</style>
