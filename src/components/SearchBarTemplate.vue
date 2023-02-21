<template>
  <div class="search-bar-template">
    <Modal @outside="clearForm(), hideForm()" v-if="clicked">
      <template v-slot:header>
        <div class="search-bar-template__form-title-container">
          <div class="search-bar-template__form-title" v-if="log">
            {{ 'search-bar-template-form-auth-login' | localize }}
          </div>
          <div class="search-bar-template__form-title" v-else-if="sign">
            {{ 'search-bar-template-form-auth-register' | localize }}
          </div>
        </div>
      </template>
      <template v-slot:main>
        <form @submit.prevent="submit">
          <div v-if="log || sign">
            <div class="search-bar-template__form-input-container">
              <div>{{ 'search-bar-template-form-auth-email' | localize }}</div>
              <input
                class="search-bar-template__form-input"
                type="text"
                v-model.trim="email"
                :class="{
                  invalid:
                    ($v.email.$dirty && !$v.email.required) ||
                    ($v.email.$dirty && !$v.email.email),
                }"
              />
              <small
                class="search-bar-template__form-validation-invalid"
                v-if="$v.email.$dirty && !$v.email.required"
                >{{
                  'search-bar-template-form-auth-email-is-required' | localize
                }}</small
              >
              <small
                class="search-bar-template__form-validation-invalid"
                v-else-if="$v.email.$dirty && !$v.email.email"
                >{{
                  'search-bar-template-form-auth-enter-correct-email' | localize
                }}</small
              >
            </div>
            <div class="search-bar-template__form-input-container">
              <div>
                {{ 'search-bar-template-form-auth-password' | localize }}
              </div>
              <input
                class="search-bar-template__form-input"
                type="password"
                v-model.trim="password"
                :class="{
                  invalid:
                    ($v.password.$dirty && !$v.password.required) ||
                    ($v.password.$dirty && !$v.password.minLength),
                }"
              />
              <small
                class="search-bar-template__form-validation-invalid"
                v-if="$v.password.$dirty && !$v.password.required"
                >{{
                  'search-bar-template-form-auth-password-is-required' |
                    localize
                }}</small
              >
              <small
                class="search-bar-template__form-validation-invalid"
                v-else-if="$v.password.$dirty && !$v.password.minLength"
                >{{
                  'search-bar-template-form-auth-password-min-length1' |
                    localize
                }}
                {{ $v.password.$params.minLength.min }}
                {{
                  'search-bar-template-form-auth-password-min-length2' |
                    localize
                }}
                {{ password.length }}
                {{
                  'search-bar-template-form-auth-password-min-length3' |
                    localize
                }}</small
              >
            </div>
          </div>
          <div v-if="sign">
            <div class="search-bar-template__form-input-container">
              <div>{{ 'search-bar-template-form-auth-name' | localize }}</div>
              <input
                class="search-bar-template__form-input"
                type="text"
                v-model.trim="name"
                :class="{ invalid: $v.name.$dirty && !$v.name.required }"
              />
              <small
                class="search-bar-template__form-validation-invalid"
                v-if="$v.name.$dirty && !$v.name.required"
                >{{
                  'search-bar-template-form-auth-name-is-required' | localize
                }}</small
              >
            </div>
          </div>
          <div class="search-bar-template__form-button-container">
            <button class="search-bar-template__form-button" type="submit">
              {{
                log
                  ? 'search-bar-template-form-auth-login-btn'
                  : 'search-bar-template-form-auth-register-btn' | localize
              }}
            </button>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <div class="search-bar-template__form-question" v-if="log">
          <div>
            {{ 'search-bar-template-form-auth-no-account' | localize }}
          </div>
          <div
            class="search-bar-template__form-link"
            @click="(sign = true), (log = false), clearForm()"
          >
            {{ 'search-bar-template-form-auth-register' | localize }}
          </div>
        </div>
        <div class="search-bar-template__form-question" v-else-if="sign">
          <div>
            {{ 'search-bar-template-form-auth-already-registered' | localize }}
          </div>
          <div
            class="search-bar-template__form-link"
            @click="(log = true), (sign = false), clearForm()"
          >
            {{ 'search-bar-template-form-auth-login' | localize }}
          </div>
        </div>
      </template>
    </Modal>
    <div class="search-bar-template__container">
      <router-link to="/">
        <div class="search-bar-template__home-link-container">
          <img
            class="search-bar-template__home-link-image"
            src="@/assets/home.png"
          />
          <div class="search-bar-template__home-link-tooltip-container">
            <Tooltip>
              <template v-slot:main>
                {{ 'search-bar-template-home-btn' | localize }}
              </template>
            </Tooltip>
          </div>
        </div>
      </router-link>
      <router-link
        to="/discover?mediatype=movie&sort_by=popularity.desc&vote_average=&with_people=&with_genres=&year=&page=1"
      >
        <div class="search-bar-template__discover-link-container">
          <img
            class="search-bar-template__discover-link-image"
            src="@/assets/discover.png"
          />
          <div class="search-bar-template__discover-link-tooltip-container">
            <Tooltip>
              <template v-slot:main>
                {{ 'search-bar-template-discover-btn' | localize }}
              </template>
            </Tooltip>
          </div>
        </div>
      </router-link>
      <div class="search-bar-template__auth-link-container">
        <div class="user-first-letter">
          {{ username ? getFirstLetter : '' }}
          <img
            v-if="username"
            class="search-bar-template__auth-link-image"
            src="@/assets/user.svg"
          />

          <img
            v-else-if="!username"
            class="search-bar-template__auth-link-image"
            src="@/assets/guest.svg"
          />
        </div>
        <div class="search-bar-template__auth-link-tooltip-container">
          <Tooltip>
            <template v-slot:main>
              <div>
                {{ 'search-bar-template-greating' | localize }},
                {{ username ? username : guest }}!
              </div>
              <button
                class="search-bar-template__auth-button"
                v-if="!username"
                @click="(log = true), (sign = false), (clicked = true)"
              >
                {{ 'search-bar-template-login-btn' | localize }}
              </button>
              <button
                class="search-bar-template__auth-button"
                v-if="username"
                @click="logout"
              >
                {{ 'search-bar-template-logout-btn' | localize }}
              </button>
              <button
                class="search-bar-template__auth-button"
                v-if="!username"
                @click="(sign = true), (log = false), (clicked = true)"
              >
                {{ 'search-bar-template-register-btn' | localize }}
              </button>
            </template>
          </Tooltip>
        </div>
      </div>
      <div class="search-bar-template__toggle-theme-container">
        <button class="search-bar-template__toggle-theme-button" />
        <div class="search-bar-template__toggle-theme-tooltip-container">
          <Tooltip>
            <template v-slot:main>
              {{ 'search-bar-template-toggle-theme-btn' | localize }}
            </template>
          </Tooltip>
        </div>
      </div>
      <div class="search-bar-template__toggle-language-container">
        <img
          v-if="locale"
          :src="require(`@/assets/${locale}.png`)"
          class="search-bar-template__toggle-language-image"
          @click="changeLocale"
        />
        <div class="search-bar-template__toggle-language-tooltip-container">
          <Tooltip>
            <template v-slot:main>
              {{ 'search-bar-template-toggle-locale-btn' | localize }}
            </template>
          </Tooltip>
        </div>
      </div>
    </div>
    <form
      class="search-bar-template__search-form"
      @submit.prevent="sendSearchRequest(query)"
    >
      <input
        class="search-bar-template__search-form-input"
        v-model="query"
        :placeholder="searchBarPlaceholder"
      />
      <button class="search-bar-template__search-form-button" type="submit">
        <img
          class="search-bar-template__search-form-button-image"
          src="@/assets/search.png"
        />
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import replaceAllToDash from '@/filters/replaceAllToDash';
import localize from '@/filters/localize';
import Modal from '@/components/Modal.vue';
import Tooltip from '@/components/Tooltip.vue';
import { email, required, minLength } from 'vuelidate/lib/validators';

@Component({
  components: {
    Modal,
    Tooltip,
  },
  validations() {
    const validations: any = {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { required },
    };
    if ((this as SearchBarTemplate).log) {
      validations.name = {};
      return validations;
    }
    return validations;
  },
})
export default class SearchBarTemplate extends Vue {
  log: boolean = false;
  sign: boolean = false;
  clicked: boolean = false;
  query: string = '';
  imgSrc: string = '';
  locale: string = '';
  guest: string = '';
  searchBarPlaceholder: string = '';
  email: string = '';
  password: string = '';
  name: string = '';
  routeName: string = '';
  username: string = '';

  @Watch('$store.getters.locale')
  localeWatcher() {
    this.guest = localize('search-bar-template-guest');
    this.searchBarPlaceholder = localize('search-bar-template-search-films');
  }

  @Watch('$store.getters.info.name')
  nameWatcher() {
    this.username = this.$store.getters.info.name;
  }

  get getFirstLetter() {
    return this.username.charAt(0).toUpperCase();
  }

  hideForm() {
    this.clicked = false;
  }

  clearForm() {
    this.name = this.email = this.password = '';
    this.$v.$reset();
  }

  async submit() {
    console.log(this.log, this.sign);
    if (this.$v.$invalid) {
      this.$v.$touch();
      return;
    }
    if (this.sign) {
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch('register', formData);
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
    this.clearForm();
    this.hideForm();
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }
  }

  async logout() {
    await this.$store.dispatch('logout');
  }

  sendSearchRequest(query: string) {
    if (query.length < 2) {
      return;
    }
    this.$router.push(`/search?${replaceAllToDash(query)}&page=1`);
    this.query = '';
  }

  changeLocale() {
    if (this.$store.getters.locale === 'en-US') {
      this.$store.commit('setLocale', 'uk-UA');
      this.locale = 'uk';
    } else if (this.$store.getters.locale === 'uk-UA') {
      this.$store.commit('setLocale', 'en-US');
      this.locale = 'en';
    }
  }

  mounted() {
    this.guest = localize('search-bar-template-guest');
    this.searchBarPlaceholder = localize('search-bar-template-search-films');
    if (this.$store.getters.locale === 'uk-UA') {
      this.locale = 'uk';
    } else if (this.$store.getters.locale === 'en-US') {
      this.locale = 'en';
    }
    const toggleTheme = document.querySelector(
      '.search-bar-template__toggle-theme-button'
    );
    let el = document.documentElement;
    if (toggleTheme !== null && el !== null) {
      toggleTheme.addEventListener('click', () => {
        if (el.hasAttribute('data-theme')) {
          el.removeAttribute('data-theme');
          localStorage.removeItem('theme');
        } else {
          el.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
        }
      });
      if (localStorage.getItem('theme')) {
        el.setAttribute('data-theme', 'light');
      }
    }
  }
}
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
  .search-bar-template__container {
    display: flex;
    justify-content: space-between;
    width: 80vw;
  }
  .search-bar-template__auth-link-container {
    position: relative;
  }
  .user-first-letter {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
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
  .search-bar-template__home-link-container {
    position: relative;
    height: 40px;
    width: 40px;
  }
  .search-bar-template__discover-link-container {
    position: relative;
    height: 40px;
    width: 40px;
  }
  .search-bar-template__toggle-theme-button {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border: 0;
    outline: none;
    background-color: transparent;
    background-image: var(--toggle-btn-img);
    background-size: contain;
    position: unset;
  }
  .search-bar-template__toggle-theme-container {
    width: 40px;
    height: 40px;
    position: relative;
  }
  .search-bar-template__toggle-language-container {
    cursor: pointer;
    position: relative;
    height: 40px;
    width: 40px;
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
  .search-bar-template__auth-link-container {
    position: absolute;
    top: calc(50% - (40px / 2));
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
  }
  .search-bar-template {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    background: var(--secondary-bg);
    position: relative;
  }
  .search-bar-template__home-link-container {
    position: absolute;
    height: 40px;
    width: 40px;
    top: calc(50% - (40px / 2));
    left: 20px;
  }
  .search-bar-template__discover-link-container {
    position: absolute;
    height: 40px;
    width: 40px;
    top: calc(50% - (40px / 2));
    left: 70px;
  }
  .search-bar-template__toggle-theme-button {
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
  }
  .search-bar-template__toggle-language-container {
    cursor: pointer;
    position: absolute;
    width: 40px;
    height: 40px;
    top: calc(50% - (40px / 2));
    right: 20px;
  }
  .search-bar-template__toggle-theme-container {
    width: 40px;
    height: 40px;
    position: absolute;
    top: calc(50% - (40px / 2));
    right: 70px;
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
.search-bar-template__auth-link-image {
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
.search-bar-template__auth-tooltip {
  visibility: hidden;
  min-width: 100px;
  background-color: var(--accent-color);
  color: #fff;
  padding: 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 1;
  top: 50px;
  right: -100px;
}
.search-bar-template__home-link-container
  .search-bar-template__home-link-tooltip-container::after,
.search-bar-template__discover-link-container
  .search-bar-template__discover-link-tooltip-container::after,
.search-bar-template__auth-link-container
  .search-bar-template__auth-link-tooltip-container::after,
.search-bar-template__toggle-theme-container
  .search-bar-template__toggle-theme-tooltip-container::after,
.search-bar-template__toggle-language-container
  .search-bar-template__toggle-language-tooltip-container::after {
  content: ' ';
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent var(--accent-color) transparent;
}
.search-bar-template__auth-button {
  cursor: pointer;
  outline: none;
  border: none;
  min-width: 200px;
  margin-top: 20px;
  border-radius: 6px;
  color: var(--accent-color);
  min-height: 24px;
}
.search-bar-template__home-link-image,
.search-bar-template__discover-link-image,
.search-bar-template__toggle-language-image {
  position: absolute;
  width: 40px;
  height: 40px;
}
.search-bar-template__home-link-tooltip-container,
.search-bar-template__discover-link-tooltip-container,
.search-bar-template__auth-link-tooltip-container,
.search-bar-template__toggle-theme-tooltip-container,
.search-bar-template__toggle-language-tooltip-container {
  visibility: hidden;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
  min-width: 50px;
  background-color: var(--accent-color);
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.search-bar-template__home-link-container:hover
  .search-bar-template__home-link-tooltip-container,
.search-bar-template__discover-link-container:hover
  .search-bar-template__discover-link-tooltip-container,
.search-bar-template__auth-link-container:hover
  .search-bar-template__auth-link-tooltip-container,
.search-bar-template__toggle-theme-container:hover
  .search-bar-template__toggle-theme-tooltip-container,
.search-bar-template__toggle-language-container:hover
  .search-bar-template__toggle-language-tooltip-container {
  visibility: visible;
}
</style>
