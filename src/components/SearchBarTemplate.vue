<template>
  <div class="search-bar-template">
    <router-link to="/">
      <img class="search-bar-template__home-link" src="@/assets/home.png" />
    </router-link>
    <div>
      <div> {{'search-bar-template-greating' | localize}}, {{name ? name : guest }}!</div>
      <button v-if="!name" @click="login">
        {{'search-bar-template-login' | localize}}
      </button>
      <button v-if="name" @click="logout">
        {{'search-bar-template-logout' | localize}}
      </button>
      <button v-if="!name" @click="register">
        {{'search-bar-template-register' | localize}}
      </button>
      <div>{{'search-bar-template-now' | localize}} {{date | dateFilter('datetime') }}</div>
    </div>
    <form class="search-bar-template__form" @submit.prevent="send(query)">
      <input class="search-bar-template__form-input" v-model="query" :placeholder="searchBarPlaceholder" />
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
    <button @click="changeLocale">{{locale}}</button>
  </div>
</template>
<script>
// import { Bus } from '@/main'
import replaceAllToDash from '@/filters/replaceAllToDash'
import localize from '@/filters/localize'
export default {
  data() {
    return {
      query: "",
      imgSrc: "",
      date: new Date(),
      interval: null,
      locale: '',
      guest: '',
      searchBarPlaceholder: ''
    };
  },
  watch: {
    '$store.state.locale.locale'() {
      this.guest = localize('search-bar-template-guest')
      this.searchBarPlaceholder = localize('search-bar-template-search-films')
    },
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    },
    // searchFilmsPlaceholder() {
    //   return localize('search-bar-template-search-films')
    // }
  },
  methods: {
    login() {
      this.$router.push('/login')
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login')
    },
    register() {
      this.$router.push('/register')
    },
    send(query) {
      if(query.length < 2) {
        return
      }
      this.$router.push(`/search?${replaceAllToDash(query)}&page=1`);
      this.query = "";
    },
    changeLocale() {
      // console.log(this.$store.state.locale.locale)
      // console.log(localStorage.getItem('locale'))
      if(this.$store.state.locale.locale === 'en-US') {
        // console.log(2)
        // localStorage.setItem('locale', 'ru-RU')
        this.$store.commit('setLocale', 'ru-RU')
        this.locale = 'Ru'
        // Bus.$emit('changeLocale', 'ru-RU')
      } else if(this.$store.state.locale.locale === 'ru-RU') {
        // console.log(3)
        // localStorage.setItem('locale', 'en-US')
        this.$store.commit('setLocale', 'en-US')
        this.locale = 'En'
        // Bus.$emit('changeLocale', 'en-US')
      }
      // console.log(localStorage.getItem('locale'))
      // Bus.$emit('changeLocale', 'changeLocale')
    }
  },
  mounted() {
    this.guest = localize('search-bar-template-guest')
    this.searchBarPlaceholder = localize('search-bar-template-search-films')
    if(this.$store.state.locale.locale === 'ru-RU') {
      this.locale = 'Ru'
    } else if(this.$store.state.locale.locale === 'en-US') {
      this.locale = 'En'
    }
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
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
  beforeDestroy() {
    clearInterval(this.interval)
  }
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
