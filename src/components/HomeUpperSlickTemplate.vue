<template>
  <div v-if="popular.length">
    <slick class="slick" ref="slick" :options="slickOptionsUpper">
      <div v-for="item in popular" :key="item.id">
        <div
          class="home-upper-slick-template"
          @mousedown="clickable = true"
          @mousemove="clickable = false"
          @mouseup="clickable ? $router.push(`details/${item.media_type}/${item.id}`) : ''"
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
            <div class="home-upper-slick-template__genres">{{ getCurrentMediaTypeGenresNames(genres, item.genre_ids) }}</div>
          </div>
        </div>
      </div>
    </slick>
  </div>
</template>

<script>
import Slick from "vue-slick";
export default {
  data() {
    return {
      clickable: undefined,
      slickOptionsUpper: {
        slidesToShow: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        draggable: true,
        lazyLoad: "ondemand",
      },
    };
  },
  props: ["genres", "popular"],
  components: {
    Slick,
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
  cursor: pointer;
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
.d {
  pointer-events: none;
}
</style>
