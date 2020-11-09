<template>
  <div class="centered">
    <router-link to="/">
      <img class="home-btn" src="../../public/home.svg" />
    </router-link>
    <input class="input" v-model="query" @keyup.enter="send(query)" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    send(query) {
      this.$router.push(`../../../../../search?${query}&page=1`);
      this.query = "";
    },
  },
};
</script>
<style scoped>
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background: black;
  position: relative;
}
.input {
  height: 24px;
  outline: none;
}
.relat {
  position: relative;
}
.home-btn {
  position: absolute;
  height: 36px;
  left: 10%;
  top: calc(50% - (36px / 2));
}
</style>
