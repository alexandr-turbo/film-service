<template>
  <div>
    <!-- <img
      :src="`${splittedReviewImage}`"
      v-if="review.author_details.avatar_path"
    > -->
    <h3>{{review.author}}</h3>
    <h4>{{splittedReviewContent}}</h4>
    <a :href="`www.themoviedb.org/review/${review.id}`">Read more</a>
  </div>
</template>

<script>
export default {
  props: ['review', 'index'],
  computed: {
    splittedReviewContent() {
      return this.review.content.substring(0, 255) + '...'
    },
    // splittedReviewImage() {
    //   return this.review.author_details.avatar_path.substring(1)
    // }
  }
}
</script>

<style>

</style>