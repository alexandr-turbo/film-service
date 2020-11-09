<template id="ем-ырщцы-slicks-template">
  <div>
    <TVShowSlick :type="airing_today" />
    <TVShowSlick :type="popular" />
    <TVShowSlick :type="on_the_air" />
    <TVShowSlick :type="top_rated" />
  </div>
</template>

<script>
import TVShowSlick from "../components/TVShowSlick.vue";

export default {
  data() {
    return {
      airing_today: "airing_today",
      popular: "popular",
      on_the_air: "on_the_air",
      top_rated: "top_rated",
    };
  },
  components: {
    TVShowSlick,
  },
};
</script>
