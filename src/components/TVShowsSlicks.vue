<template id="tv-shows-slicks-template">
  <div>
    <div v-for="tvshowSlick in tvshowSlickArr" :key="tvshowSlick.id">
      <TVShowSlick :type="tvshowSlick" />
    </div>
  </div>
</template>

<script>
import TVShowSlick from "../components/TVShowSlick.vue";

export default {
  data() {
    return {
      tvshowSlickArr: ["airing_today", "popular", "on_the_air", "top_rated"]
    };
  },
  components: {
    TVShowSlick,
  },
};
</script>
