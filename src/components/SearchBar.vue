<template>
  <div class="centered">
    <router-link to="/">
      <img class="home-btn" src="@/assets/home.png" />
      <!-- <img class="home-btn" src="../../public/home.png" /> -->
    </router-link>
    <form class="formheight" @submit.prevent="send(query)">
      <input class="inputfield" v-model="query" placeholder="search films" />
      <button class="buttonclass" type="submit">
        <img class="imageclass" src="@/assets/search.png">
        <!-- <img class="imageclass" src="../../public/search.png"> -->
      </button>
    </form>
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
.input2 {
  max-height: 24px;
  margin: 0;
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
.formheight {
  display: flex;
  align-items: center;
}
.button2 {
  margin: 0;
  padding: 0;
  border: 0;
  /* height: 30px; */
  outline: none;
}
.imgclass {
  height: 30px;
  /* position: absolute; */
}
.inputfield {
  height: 24px;
  border: 0;
  border-radius: 12px;
  outline: none;
  padding-left: 10px;
  padding-right: 50px;
}
.imageclass {
  /* border: 0; */
  height: 14px;
  /* margin: auto; */
  /* padding: 0; */
  /* width: auto; */
}
.buttonclass {
  border-radius: 12px;
  outline: none;
  /* height: 24px; */
  /* margin: auto; */
  padding: 6px 15px;
  background: red;
  border: 0;
  margin-left: -43px;
  display: flex;
  align-items: center;
}
</style>
