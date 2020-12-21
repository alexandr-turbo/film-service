<template>
  <div
    :class="
      index % 2 === 0
        ? 'film-review-template__right-border'
        : 'film-review-template__left-border'
    "
  >
    <div class="film-review-template__bio">
      <div>{{ review.author }}</div>
      <div>{{ splittedReviewContent }}</div>
      <a
        class="film-review-template__full-review"
        :href="`//www.themoviedb.org/review/${review.id}`"
        >See full review >></a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["review", "index"],
  computed: {
    splittedReviewContent() {
      return this.review.content.substring(0, 255) + "...";
    },
  },
};
</script>

<style>
.film-review-template__right-border {
  display: flex;
  background: #1c262b;
  padding: 20px;
  border-right: 5px solid white;
  flex-direction: column;
  margin: 25px 0;
}
.film-review-template__left-border {
  display: flex;
  background: #1c262b;
  flex-direction: column;
  padding: 20px;
  border-left: 5px solid white;
  margin: 25px 0;
}
.film-review-template__bio {
  margin: auto 20px;
}
.film-review-template__full-review {
  text-decoration: none;
  color: unset;
}
</style>
