<template>
  <div id="app">
    <div id="page-preloader" class="preloader" v-if="isLoading">
      <div class="loader"></div>
    </div>
    <SearchBarTemplate />
    <router-view />
    <div
      class="app__go-to-top-button-container"
      id="backToTop"
      @click="goToTop"
    >
      <img class="app__go-to-top-button" src="./assets/arrow.svg" />
    </div>
    <FooterTemplate />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SearchBarTemplate from '@/components/SearchBarTemplate.vue';
import FooterTemplate from '@/components/FooterTemplate.vue';

@Component({
  components: {
    SearchBarTemplate,
    FooterTemplate,
  },
})
export default class App extends Vue {
  isLoading: boolean = false;
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
    window.addEventListener('scroll', this.onScroll);
    this.$root.$on('isLoading', (isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const element = document.getElementById('backToTop');
    if (element !== null) {
      if (pageYOffset >= 100) {
        element.classList.add('app__go-to-top-button-visibility');
      } else if (pageYOffset < 100) {
        element.classList.remove('app__go-to-top-button-visibility');
      }
    }
  }

  goToTop() {
    const element = document.getElementById('app');
    if (element !== null) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async changeLocale() {
    this.$store.dispatch('loadMovieGenres');
    this.$store.dispatch('loadTVShowsGenres');
  }
  async created() {
    await this.$store.dispatch('loadMovieGenres');
    await this.$store.dispatch('loadTVShowsGenres');
  }
}
</script>
<style>
@import 'css/style.css';
#app {
  margin-top: 0 !important;
}
body {
  margin: 0 !important;
  font-family: sans-serif;
  color: var(--main-text-color) !important;
}
.preloader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  transition: 1s all;
  visibility: visible;
  animation-name: animation;
  animation-duration: 3s;
}
@keyframes animation {
  0% {
    background: black;
    opacity: 1;
  }
  100.0% {
    background: black;
    opacity: 0;
  }
}
.loader {
  width: 75px;
  height: 75px;
  border: 10px solid white;
  border-radius: 50%;
  border-top-color: blue;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: 1s spin infinite linear;
}
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
    opacity: 1;
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
    opacity: 1;
  }
}
.app__go-to-top-button-container {
  position: fixed;
  height: 70px;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--accent-color);
  border-radius: 50%;
  bottom: 30px;
  right: 30px;
  cursor: pointer;
  transition: 0.5s all;
  opacity: 0;
}
.app__go-to-top-button {
  height: 30px;
}
.app__go-to-top-button-visibility {
  transition: 0.5s all;
  opacity: 1;
}
</style>
