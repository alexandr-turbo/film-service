<template>
  <div class="centered">
    <router-link to="/">
      <img class="home-link" src="@/assets/home.png" />
    </router-link>
    <form class="formheight" @submit.prevent="send(query)">
      <input class="inputfield" v-model="query" placeholder="search films" />
      <button class="buttonclass" type="submit">
        <img class="imageclass" src="@/assets/search.png" />
        <!-- <img class="imageclass" src="../../public/search.png"> -->
      </button>
    </form>
    <router-link
      to="/discover?movie&sort_by=popularity.desc&vote_average.gte=&with_people=&with_genres=&year=&page=1"
    >
      <img class="discover-link" src="@/assets/discover.png" />
    </router-link>
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
  height: 80px;
  background: #1c262b;
  position: relative;
  /* position: absolute;
  z-index: 1000000000;
  width: 100%; */
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
.home-link {
  position: absolute;
  height: 40px;
  left: 10%;
  top: calc(50% - (40px / 2));
}
.discover-link {
  position: absolute;
  height: 40px;
  right: 10%;
  top: calc(50% - (40px / 2));
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
.inputfield {
  height: 32px;
  width: 30vw;
  border: 0;
  border-radius: 20px;
  outline: none;
  padding-left: 18px;
  padding-right: 100px;
  font-size: 18px;
}
.imageclass {
  /* border: 0; */
  height: 16px;
  /* margin: auto; */
  /* padding: 0; */
  /* width: auto; */
}
.buttonclass {
  border-radius: 20px;
  outline: none;
  /* height: 24px; */
  /* margin: auto; */
  padding: 9px 30px;
  background: #eb4e7a;
  border: 0;
  margin-left: -76px;
  display: flex;
  align-items: center;
}
</style>
