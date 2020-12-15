<template>
  <div>
    <div v-for="filmSlick in filmSlickArr" :key="filmSlick.id">
      <HomeSlickTemplate :type="filmSlick" :filmType="filmType" :genres="genres" />
    </div>
  </div>
</template>

<script>
import HomeSlickTemplate from "../components/HomeSlickTemplate.vue";

export default {
  props: ["filmSlickArr", "filmType", "genres"],
  components: {
    HomeSlickTemplate,
  },
};
</script>
