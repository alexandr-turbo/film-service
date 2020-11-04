<template>
  <!-- <div class="container"> -->
  <div class="centered">
    <input class="input" v-model="query" @keyup.enter="send(query)">
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      query: '',
    }
  },
  watch: {
    query () {
      /*eslint-disable*/
      console.log(this.query)
      /*eslint-enable*/
    }
  },
  methods: {
    send(query) {
      this.$router.push(`../../../../../search?${query}`)
    }
  }
}
</script>
<style scoped>
/* .container {
  padding: 2rem 4rem;
  margin: 0 auto;
  max-width: 80%;
} */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
.input {
  height: 24px;
}
</style>