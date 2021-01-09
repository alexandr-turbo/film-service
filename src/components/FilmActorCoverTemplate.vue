<template>
  <div class="film-actor-cover-template__container">
    <router-link
      tag="div"
      class="film-actor-cover-template"
      :title="item.bio"
      :to="{
        name: 'actor',
        params: {
          actorID: item.id,
        },
      }"
    >
      <img
        v-if="item.profile_path && item.profile_path !== ''"
        class="film-actor-cover-template__actor-photo"
        :src="`${globalImgAddress}154${item.profile_path}`"
      />
      <img
        v-else
        class="film-actor-cover-template__actor-photo"
        src="@/assets/no-image.png"
      />
      <div class="film-actor-cover-template__actor-name">{{ item.name }}</div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["item"],
};
</script>
<style scoped>
.film-actor-cover-template__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.film-actor-cover-template {
  margin: 10px auto;
  cursor: pointer;
}
.film-actor-cover-template__actor-photo {
  border-radius: 5px;
  height: 190px;
  width: auto;
  margin: 10px auto;
  filter: brightness(0.8);
}
.film-actor-cover-template__actor-photo:hover {
  transform: scale(1.1);
  filter: brightness(1);
}
.film-actor-cover-template__actor-name {
  text-align: center;
  /* color: var(--main-text-color); */
}
</style>
