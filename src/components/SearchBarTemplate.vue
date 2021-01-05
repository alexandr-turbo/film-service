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
      to="/discover?mediatype=movie&sort_by=popularity.desc&vote_average.gte=&with_people=&with_genres=&year=&page=1"
    >
      <img class="search-bar-template__discover-link" src="@/assets/discover.png" />
    </router-link>
    <button class="toggle-theme" />
  </div>
</template>
<script>
import replaceAllToDash from '@/filters/replaceAllToDash'
export default {
  data() {
    return {
      query: "",
      imgSrc: ""
    };
  },
  methods: {
    send(query) {
      this.$router.push(`/search?${replaceAllToDash(query)}&page=1`);
      this.query = "";
    },
  },
  mounted() {
    const toggleTheme = document.querySelector(".toggle-theme")
    let el = document.documentElement
    toggleTheme.addEventListener('click', () => {
      if(el.hasAttribute('data-theme')) {
        el.removeAttribute('data-theme')
        localStorage.removeItem('theme')
      } else {
        el.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
      }
    })
    if(localStorage.getItem('theme') !== null) {
      el.setAttribute('data-theme', 'light')
    }
  },
};
</script>
<style scoped>
.search-bar-template {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background: var(--secondary-bg);
  position: relative;
}
.search-bar-template__home-link {
    position: absolute;
    height: 40px;
    top: calc(50% - (40px / 2));
  }
@media (max-width: 539px) {
  .search-bar-template__home-link {
    left: 5%;
  }
}
@media (min-width: 540px) {
  .search-bar-template__home-link {
    left: 10%;
  }
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
  background: var(--accent-color);
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
    top: calc(50% - (40px / 2));
  }
@media (max-width: 539px) {
  .search-bar-template__discover-link {
    right: 5%;
  }
}
@media (min-width: 540px) {
  .search-bar-template__discover-link {
    right: 10%;
  }
}
.toggle-theme {
    width: 40px;
    height: 40px;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background-color: transparent;
    background-image: var(--toggle-btn-img);
    background-size: contain;
    position: absolute;
    top: calc(50% - (40px / 2));
  }
@media (max-width: 539px) {
  .toggle-theme {
    right: 10%;
  }
}
@media (min-width: 540px) {
  .toggle-theme {
    right: 15%;
  }
}
</style>
