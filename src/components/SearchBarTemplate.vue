<template>
  <div class="search-bar-template">
    <Modal @outside="clearForm(), hideForm()" v-if="clicked">
      <template v-slot:header>
        <div class="search-bar-template__form-title-container">
          <div class="search-bar-template__form-title" v-if="log">
            {{'auth-login' | localize}}
          </div>
          <div class="search-bar-template__form-title" v-else-if="sign">
            {{'auth-register' | localize}}
          </div>
        </div>
      </template>
      <template v-slot:main>
        <form @submit.prevent="submit">
          <div v-if="log || sign">
            <div class="search-bar-template__form-input-container">
              <div>{{'auth-email' | localize}}</div>
              <input class="search-bar-template__form-input" type="text" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" />
              <small class="search-bar-template__form-validation-invalid" v-if="$v.email.$dirty && !$v.email.required">{{'auth-email-is-required' | localize}}</small>
              <small class="search-bar-template__form-validation-invalid" v-else-if="$v.email.$dirty && !$v.email.email">{{'auth-email-is-required' | localize}}</small>
            </div>
            <div class="search-bar-template__form-input-container">
              <div>{{'auth-password' | localize}}</div>
              <input class="search-bar-template__form-input" type="password" v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" />
              <small class="search-bar-template__form-validation-invalid" v-if="$v.password.$dirty && !$v.password.required">{{'auth-password-is-required' | localize}}</small>
              <small class="search-bar-template__form-validation-invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">{{'auth-password-min-length1' | localize}} {{$v.password.$params.minLength.min}} {{'auth-password-min-length2' | localize}} {{ password.length }} {{'auth-password-min-length3' | localize}}</small>
            </div>
          </div>
          <div v-if="sign">
            <div class="search-bar-template__form-input-container">
              <div>{{'auth-name' | localize}}</div>
              <input class="search-bar-template__form-input" type="text" v-model.trim="name" :class="{invalid: $v.name.$dirty && !$v.name.required}">
              <small class="search-bar-template__form-validation-invalid" v-if="$v.name.$dirty && !$v.name.required">{{'auth-name-is-required' | localize}}</small>
            </div>
          </div>
          <div class="search-bar-template__form-button-container">
            <button class="search-bar-template__form-button" type="submit">{{'auth-submit' | localize}}</button>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <div class="search-bar-template__form-question" v-if="log">
          <div>
            {{'auth-no-account' | localize}}
          </div>
          <div class="search-bar-template__form-link" @click="sign = true, log = false, clearForm()">{{'auth-register' | localize}}</div>
        </div>
        <div class="search-bar-template__form-question" v-else-if="sign">
          <div>
            {{'auth-already-registered' | localize}}
          </div>
          <div class="search-bar-template__form-link" @click="log = true, sign = false, clearForm()">{{'auth-login' | localize}}</div>
        </div>
      </template>
    </Modal>
    <div class="a">
      <router-link to="/">
        <img title="Home" class="search-bar-template__home-link" src="@/assets/home.png" />
      </router-link>
      <router-link
        to="/discover?mediatype=movie&sort_by=popularity.desc&vote_average=&with_people=&with_genres=&year=&page=1"
      >
        <img title="Discover" class="search-bar-template__discover-link" src="@/assets/discover.png" />
      </router-link>
      <div class="search-bar-template__auth-tooltip-container">
        <div class="user-first-letter">
          {{username ? firstLetter : ''}}
          <img v-if="username" class="user-photo" src="@/assets/user.svg">

          <img v-else-if="!username" class="user-photo" src="@/assets/guest.svg">
        </div>
        <span class="search-bar-template__auth-tooltip">
          <div> {{'search-bar-template-greating' | localize}}, {{username ? username : guest }}!</div>
          <button class="search-bar-template__auth-button" v-if="!username" @click="log = true, sign = false, clicked = true">
            {{'search-bar-template-login' | localize}}
          </button>
          <button class="search-bar-template__auth-button" v-if="username" @click="logout">
            {{'search-bar-template-logout' | localize}}
          </button>
          <button class="search-bar-template__auth-button" v-if="!username" @click="sign = true, log = false, clicked = true">
            {{'search-bar-template-register' | localize}}
          </button>
        </span>
      </div>
      <button title="Change theme" class="toggle-theme" />
      <img title="Change locale" v-if="locale" :src="require(`@/assets/${locale}.png`)" class="toggle-language" @click="changeLocale">
    </div>
    <form class="search-bar-template__search-form" @submit.prevent="send(query)">
      <input class="search-bar-template__search-form-input" v-model="query" :placeholder="searchBarPlaceholder" />
      <button class="search-bar-template__search-form-button" type="submit">
        <img class="search-bar-template__search-form-button-image" src="@/assets/search.png" />
      </button>
    </form>
  </div>
</template>
<script>
import replaceAllToDash from '@/filters/replaceAllToDash'
import localize from '@/filters/localize'
import Modal from "@/components/Modal.vue";
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      log: false,
      sign: false,
      clicked: false,
      query: "",
      imgSrc: "",
      locale: '',
      guest: '',
      searchBarPlaceholder: '',
      email: '',
			password: '',
      name: '',
      routeName: '',
      username: '',
      userIconVisible: false
    };
  },
  validations() {
    if (this.log) {
      return {
        email: { email, required },
        password: { required, minLength: minLength(6) },
      }
    } else if (this.sign) {
      return {
        email: { email, required },
        password: { required, minLength: minLength(6) },
        name: { required }
      }
    }
  },
  components: {
    Modal
  },
  watch: {
    '$store.state.locale.locale'() {
      this.guest = localize('search-bar-template-guest')
      this.searchBarPlaceholder = localize('search-bar-template-search-films')
    },
    '$store.getters.info.name'() {
      this.username = this.$store.getters.info.name
    }
  },
  computed: {
    firstLetter() {
      return this.username.charAt(0).toUpperCase()
    }
  },
  methods: {
    hideForm() {
      this.clicked = false
    },
    clearForm() {
      this.name = this.email = this.password = ''
      this.$v.$reset()
    },
    async submit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.sign) {
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        try {
          await this.$store.dispatch('register', formData)
        } catch (e) {}
      } else if (this.log) {
        const formData = {
          email: this.email,
          password: this.password,
        };
        try {
          await this.$store.dispatch('login', formData);
        } catch (e) {}
      }
      this.clearForm()
      this.hideForm()
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }
		},
    async logout() {
      await this.$store.dispatch('logout')
    },
    send(query) {
      if(query.length < 2) {
        return
      }
      this.$router.push(`/search?${replaceAllToDash(query)}&page=1`);
      this.query = "";
    },
    changeLocale() {
      if(this.$store.state.locale.locale === 'en-US') {
        this.$store.commit('setLocale', 'ru-RU')
        this.locale = 'ru'
      } else if(this.$store.state.locale.locale === 'ru-RU') {
        this.$store.commit('setLocale', 'en-US')
        this.locale = 'en'
      }
    }
  },
  mounted() {
    this.guest = localize('search-bar-template-guest')
    this.searchBarPlaceholder = localize('search-bar-template-search-films')
    if(this.$store.state.locale.locale === 'ru-RU') {
      this.locale = 'ru'
    } else if(this.$store.state.locale.locale === 'en-US') {
      this.locale = 'en'
    }
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
@media (max-width: 640px) {
  .search-bar-template__search-form-input {
    height: 32px;
    width: 50vw;
    border: 0;
    border-radius: 20px;
    outline: none;
    padding-left: 18px;
    padding-right: 100px;
    font-size: 18px;
  }
  .a {
    display: flex;
    justify-content: space-between;
    width: 80vw;
    /* flex-direction: row; */
  }
  .search-bar-template__auth-tooltip-container {
    position: relative;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* top: calc(50% - (40px / 2)); */
    /* top: 50%; */
    /* right: 140px; */
  }
  .user-first-letter {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    /* top: calc(50% - (16px / 2));
    right: 135px; */
  }
  .search-bar-template {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 160px;
    background: var(--secondary-bg);
    position: relative;
  }
  .search-bar-template__home-link {
    position: unset;
    height: 40px;
    /* top: calc(50% - (40px / 2));
    left: 20px; */
  }
  .search-bar-template__discover-link {
    position: unset;
    height: 40px;
    /* top: calc(50% - (40px / 2));
    left: 70px; */
  }
  .toggle-theme {
    cursor: pointer;
    width: 40px;
    height: 40px;
    padding: 0;
    margin: 0;
    border: 0;
    outline: none;
    background-color: transparent;
    background-image: var(--toggle-btn-img);
    background-size: contain;
    position: unset;
    /* top: calc(50% - (40px / 2));
    right: 70px; */
  }
  .toggle-language {
    cursor: pointer;
    position: unset;
    width: 40px;
    height: 40px;
    /* top: calc(50% - (40px / 2));
    right: 20px; */
  }
}
@media (min-width: 641px) {
  .search-bar-template__search-form-input {
    height: 32px;
    width: 30vw;
    border: 0;
    border-radius: 20px;
    outline: none;
    padding-left: 18px;
    padding-right: 100px;
    font-size: 18px;
  }
  .search-bar-template__auth-tooltip-container {
    position: absolute;
    /* display: flex;
    justify-content: center;
    align-items: center; */
    top: calc(50% - (40px / 2));
    /* top: 50%; */
    right: 120px;
  }
  .user-first-letter {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    /* top: calc(50% - (16px / 2));
    right: 135px; */
  }
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
    left: 20px;
  }
  .search-bar-template__discover-link {
    position: absolute;
    height: 40px;
    top: calc(50% - (40px / 2));
    left: 70px;
  }
  .toggle-theme {
    cursor: pointer;
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
    right: 70px;
  }
  .toggle-language {
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    top: calc(50% - (40px / 2));
    right: 20px;
  }
}
.search-bar-template__form-title-container,
.search-bar-template__form-button-container {
  display: flex;
  justify-content: center;
}
.search-bar-template__form-title {
  margin-bottom: 20px;
} 
.search-bar-template__form-input-container {
  display: flex;
  flex-direction: column;
  position: relative;
}
.search-bar-template__form-input,
.search-bar-template__form-button {
  outline: none;
  border: none;
  min-width: 200px;
  color: var(--accent-color);
  margin-bottom: 20px;
}
.search-bar-template__form-button {
  border-radius: 6px;
  min-height: 24px;
}
.search-bar-template__form-validation-invalid {
  color: white;
  position: absolute;
  top: 40px;
  font-size: 10px;
}
.search-bar-template__form-question {
  display: flex;
  justify-content: space-between;
}
.search-bar-template__form-link {
  text-decoration: underline;
}
.user-photo {
  height: 40px;
  position: absolute;
}

.search-bar-template-greating {
  display: flex;
}


.search-bar-template__search-form {
  display: flex;
  align-items: center;
}

.search-bar-template__search-form-button {
  cursor: pointer;
  border-radius: 20px;
  outline: none;
  padding: 9px 30px;
  background: var(--accent-color);
  border: 0;
  margin-left: -76px;
  display: flex;
  align-items: center;
}
.search-bar-template__search-form-button-image {
  height: 16px;
}
/* Tooltip text */
.search-bar-template__auth-tooltip {
  visibility: hidden;
  min-width: 100px;
  background-color: var(--accent-color);
  color: #fff;
  /* text-align: center; */
  padding: 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
  top: 50px;
  /* left: calc(100% - 20px); */
  /* right: 50%;
  left: 50%; */
  /* left: 0; */
  right: -100px;
}

/* Show the tooltip text when you mouse over the tooltip container */
.search-bar-template__auth-tooltip-container:hover .search-bar-template__auth-tooltip {
  visibility: visible;
}
.search-bar-template__auth-tooltip-container .search-bar-template__auth-tooltip::after {
  content: " ";
  position: absolute;
  bottom: 100%;  /* At the top of the tooltip */
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent var(--accent-color) transparent;
}
.search-bar-template__auth-button {
  /* border-radius: 20px; */
  cursor: pointer;
  outline: none;
  border: none;
  min-width: 200px;
  margin-top: 20px;
  border-radius: 6px;
  color: var(--accent-color);
  min-height: 24px;
}
</style>
