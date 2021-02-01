<template>
  <div class="search-bar-template">
    <Auth @outside="clearForm(), hideForm()" v-if="clicked">
      <template class="flex2" v-slot:header>
        <div class="flex">
          <div class="auth__form-title" v-if="log">
            {{'auth-login' | localize}}
          </div>
          <div class="auth__form-title" v-else-if="sign">
            {{'auth-register' | localize}}
          </div>
        </div>
      </template>
      <template class="flex2" v-slot:main>
        <form @submit.prevent="submit">
          <div v-if="log || sign">
            <div class="auth__form-input-container">
              <div>{{'auth-email' | localize}}</div>
              <input class="auth__form-input" type="text" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" />
              <small class="auth__form-validation-invalid" v-if="$v.email.$dirty && !$v.email.required">{{'auth-email-is-required' | localize}}</small>
              <small class="auth__form-validation-invalid" v-else-if="$v.email.$dirty && !$v.email.email">{{'auth-email-is-required' | localize}}</small>
            </div>
            <div class="auth__form-input-container">
              <div>{{'auth-password' | localize}}</div>
              <input class="auth__form-input" type="password" v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" />
              <small class="auth__form-validation-invalid" v-if="$v.password.$dirty && !$v.password.required">{{'auth-password-is-required' | localize}}</small>
              <small class="auth__form-validation-invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">{{'auth-password-min-length1' | localize}} {{$v.password.$params.minLength.min}} {{'auth-password-min-length2' | localize}} {{ password.length }} {{'auth-password-min-length3' | localize}}</small>
            </div>
          </div>
          <div v-if="sign">
            <div class="auth__form-input-container">
              <div>{{'auth-name' | localize}}</div>
              <input class="auth__form-input" type="text" v-model.trim="name" :class="{invalid: $v.name.$dirty && !$v.name.required}">
              <small class="auth__form-validation-invalid" v-if="$v.name.$dirty && !$v.name.required">{{'auth-name-is-required' | localize}}</small>
            </div>
          </div>
          <div class="flex">
            <button class="auth__form-button" type="submit">{{'auth-submit' | localize}}</button>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <!-- <div class="flex"> -->
          <div class="flex3" v-if="log">
            <div>
              {{'auth-no-account' | localize}}
            </div>
            <div class="auth__form-link" @click="sign = true, log = false, clearForm()">{{'auth-register' | localize}}</div>
          </div>
          <div class="flex3" v-else-if="sign">
            <div>
              {{'auth-already-registered' | localize}}
            </div>
            <div class="auth__form-link" @click="log = true, sign = false, clearForm()">{{'auth-login' | localize}}</div>
          </div>
        <!-- </div> -->
      </template>
    </Auth>
    <router-link to="/">
      <img class="search-bar-template__home-link" src="@/assets/home.png" />
    </router-link>
    <router-link
      to="/discover?mediatype=movie&sort_by=popularity.desc&vote_average=&with_people=&with_genres=&year=&page=1"
    >
      <img class="search-bar-template__discover-link" src="@/assets/discover.png" />
    </router-link>
    <button class="toggle-theme" />
    <button class="toggle-language" @click="changeLocale">{{locale}}</button>
    <div class="search-bar-template-greating">
      <div> {{'search-bar-template-greating' | localize}}, {{username ? username : guest }}!</div>
      <!-- <div class="arrow-down"></div> -->
      <!-- <button v-if="!name" @click="login">
        {{'search-bar-template-login' | localize}}
      </button> -->
      <button v-if="!username" @click="log = true, sign = false, clicked = true">
        {{'search-bar-template-login' | localize}}
      </button>
      <button v-if="username" @click="logout">
        {{'search-bar-template-logout' | localize}}
      </button>
      <button v-if="!username" @click="sign = true, log = false, clicked = true">
        {{'search-bar-template-register' | localize}}
      </button>
    </div>
    <form class="search-bar-template__form" @submit.prevent="send(query)">
      <input class="search-bar-template__form-input" v-model="query" :placeholder="searchBarPlaceholder" />
      <button class="search-bar-template__form-button" type="submit">
        <img class="search-bar-template__form-button-image" src="@/assets/search.png" />
      </button>
    </form>
  </div>
</template>
<script>
// import { Bus } from '@/main'
import replaceAllToDash from '@/filters/replaceAllToDash'
import localize from '@/filters/localize'
import Auth from "@/components/Auth.vue";
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      log: false,
      sign: false,
      clicked: false,
      query: "",
      imgSrc: "",
      // date: new Date(),
      // interval: null,
      locale: '',
      guest: '',
      searchBarPlaceholder: '',
      email: '',
			password: '',
      name: '',
      routeName: '',
      username: ''
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
    Auth
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
        this.locale = 'Ru'
      } else if(this.$store.state.locale.locale === 'ru-RU') {
        this.$store.commit('setLocale', 'en-US')
        this.locale = 'En'
      }
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
  left: 20px;
}
.search-bar-template__discover-link {
  position: absolute;
  height: 40px;
  top: calc(50% - (40px / 2));
  left: 70px;
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
  right: 70px;
}
.toggle-language {
  position: absolute;
  /* top: calc(50% - (40px / 2)); */
  right: 20px;
}
.arrow-down {
  width: 0; 
  height: 0; 
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  
  border-top: 20px solid #f00;
}
.search-bar-template-greating {
  display: flex;
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
.auth__form-input-container {
  display: flex;
  flex-direction: column;
  position: relative;
}
.auth__form-title {
  margin-bottom: 20px;
} 
.auth__form-input,
.auth__form-button {
  margin-bottom: 20px;
  outline: none;
} 
.auth__form-validation-invalid {
  color: white;
  position: absolute;
  top: 40px;
}
.flex {
  display: flex;
  justify-content: center;
}
.flex2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.flex3 {
  display: flex;
  justify-content: space-between;
}
.auth__form-link {
  text-decoration: underline;
}
</style>
