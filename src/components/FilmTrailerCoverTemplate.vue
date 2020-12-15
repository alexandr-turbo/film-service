<template>
  <div>
    <div class="film-trailer-cover-template__trailer">
      <iframe
        :src="`https://www.youtube.com/embed/${item.key}`"
      ></iframe>
    </div>
    <h4 class="film-trailer-cover-template__trailer-title">{{ item.name }}</h4>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>
<style scoped>
.film-trailer-cover-template__trailer {
  display: flex;
  justify-content: center;
}
.film-trailer-cover-template__trailer-title {
  text-align: center;
}
</style>
