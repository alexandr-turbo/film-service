<template id="film-slick-template">
  <div class="container" v-if="type1.length">
    <h3 class="uppercase left-text">
      {{ type | replaceDash }}
    </h3>
    <slick class="slick" ref="slick" :options="slickOptions">
      <div class="cs" v-for="item in type1" :key="item.id">
        <FilmCover :item="item" :genres="genres" :movieType="movieType" />
      </div>
    </slick>
  </div>
</template>

<script>
import axios from "axios";
import Slick from "vue-slick";
import FilmCover from "../components/FilmCover.vue";

export default {
  data() {
    return {
      type1: [],
      slickOptions: {
        slidesToShow: 7,
        infinite: true,
        // autoplay: true,
        // autoplaySpeed: 500,
        draggable: false,
        lazyLoad: 'ondemand',
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 6,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
            }
          },
          {
            breakpoint: 850,
            settings: {
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 684,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 540,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 1,
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      },
    };
  },
  components: {
   FilmCover, Slick, 
  },
  props: ["type", "genres", "movieType"],
  // inject: ["movieType"],
  created() {
    this.getFilms()
  },
  watch: {
    movieType() {
      this.type1 = []
      this.getFilms()
    }
  },
  methods: {
    async getFilms() {
      await axios
        .get(
          `https://api.themoviedb.org/3/${this.movieType}/${this.type}?api_key=f943d3d10cc39fd734122d69efabbacb`
        )
        .then((response) => {
          this.type1 = response.data.results;
        })
    },
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },
    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$refs.slick.reSlick();
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cs {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }
  .text-justify {
    text-align: center;
  }
</style>
