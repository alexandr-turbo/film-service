<template>
  <div>
    <div class="film-trailer-cover-template__trailer-container">
      <div class="film-trailer-cover-template__trailer">
        <iframe
          width="100%"
          :src="`https://www.youtube.com/embed/${item.key}`"
        ></iframe>
        <div class="film-trailer-cover-template__trailer-title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>
<style scoped>
.film-trailer-cover-template__trailer-container {
  display: flex;
  justify-content: center;
}
@media (max-width: 539px) {
  .film-trailer-cover-template__trailer {
    width: 250px;
    height: 240px;
  }
}
@media (min-width: 540px) {
  .film-trailer-cover-template__trailer {
    width: 320px;
    height: 240px;
  }
}
.film-trailer-cover-template__trailer-title {
  text-align: center;
  margin: 10px auto 0;
  /* width: 300px; */
}
</style>
