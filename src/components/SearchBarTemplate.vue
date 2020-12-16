<template>
  <div class="search-bar-template">
    <router-link to="/">
      <img class="search-bar-template__home-link" src="@/assets/home.png" />
    </router-link>
    <form class="search-bar-template__form" @submit.prevent="send(query)">
      <input class="search-bar-template__form-input" v-model="query" placeholder="search films" />
      <button class="search-bar-template__form-button" type="submit">
        <img class="search-bar-template__form-button-image" src="@/assets/search.png" />
      </button>
    </form>
    <router-link
      to="/discover?movie&sort_by=popularity.desc&vote_average.gte=&with_people=&with_genres=&year=&page=1"
    >
      <img class="search-bar-template__discover-link" src="@/assets/discover.png" />
    </router-link>
  </div>
</template>
<script>
import replaceAllToDash from '@/filters/replaceAllToDash'
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    send(query) {
      this.$router.push(`/search?${replaceAllToDash(query)}&page=1`);
      this.query = "";
    },
  },
};
</script>
<style scoped>
.search-bar-template {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background: #1c262b;
  position: relative;
}
.search-bar-template__home-link {
  position: absolute;
  height: 40px;
  left: 10%;
  top: calc(50% - (40px / 2));
}
.search-bar-template__form {
  display: flex;
  align-items: center;
}
.search-bar-template__form-input {
  height: 32px;
  width: 30vw;
  border: 0;
  border-radius: 20px;
  outline: none;
  padding-left: 18px;
  padding-right: 100px;
  font-size: 18px;
}
.search-bar-template__form-button {
  border-radius: 20px;
  outline: none;
  padding: 9px 30px;
  background: #eb4e7a;
  border: 0;
  margin-left: -76px;
  display: flex;
  align-items: center;
}
.search-bar-template__form-button-image {
  height: 16px;
}
.search-bar-template__discover-link {
  position: absolute;
  height: 40px;
  right: 10%;
  top: calc(50% - (40px / 2));
}
</style>
