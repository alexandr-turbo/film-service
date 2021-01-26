<template>
  <div class="auth">
		<form class="auth__form" @submit.prevent="submit">
      <div v-if="routeName === 'login' || routeName === 'register'">
        <input type="text" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" />
        <small class="auth__form-validation-invalid" v-if="$v.email.$dirty && !$v.email.required">{{'auth-email-is-required' | localize}}</small>
        <small class="auth__form-validation-invalid" v-else-if="$v.email.$dirty && !$v.email.email">{{'auth-email-is-required' | localize}}</small>
        
        <input type="password" v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" />
        <small class="auth__form-validation-invalid" v-if="$v.password.$dirty && !$v.password.required">{{'auth-password-is-required' | localize}}</small>
        <small class="auth__form-validation-invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">{{'auth-password-min-length1' | localize}} {{$v.password.$params.minLength.min}} {{'auth-password-min-length2' | localize}} {{ password.length }} {{'auth-password-min-length3' | localize}}</small>
      </div>
			<div v-if="routeName === 'register'">
        <input type="text" v-model.trim="name" :class="{invalid: $v.name.$dirty && !$v.name.required}">
        <small class="auth__form-validation-invalid" v-if="$v.name.$dirty && !$v.name.required">{{'auth-name-is-required' | localize}}</small>
      </div>
			<button type="submit">{{'auth-submit' | localize}}</button>
		</form>
    <div v-if="routeName === 'login'">
      <div>
        {{'auth-no-account' | localize}}
      </div>
      <router-link to="/register">{{'auth-register' | localize}}</router-link>
    </div>
    <div v-if="routeName === 'register'">
      <div>
        {{'auth-already-registered' | localize}}
      </div>
      <router-link to="/login">{{'auth-login' | localize}}</router-link>
    </div>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
			email: '',
			password: '',
      name: '',
      routeName: ''
    };
  },
  validations() {
    if (this.routeName === 'login') {
      return {
        email: { email, required },
        password: { required, minLength: minLength(6) },
      }
    } else if (this.routeName === 'register') {
      return {
        email: { email, required },
        password: { required, minLength: minLength(6) },
        name: { required }
      }
    }
  },
  watch: {
    $route() {
      this.routeName = this.$route.name
    }
  },
	created() {
    this.routeName = this.$route.name
		this.$root.loading = false
	},
	methods: {
		async submit() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      if (this.routeName === "register") {
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        }
        try {
          await this.$store.dispatch('register', formData)
          this.$router.push('/')
          // eslint-disable-next-line no-empty
        } catch (e) {}
      } else if (this.routeName === "login") {
        const formData = {
          email: this.email,
          password: this.password,
        };
        try {
          await this.$store.dispatch('login', formData);
          this.$router.push("/");
          // eslint-disable-next-line no-empty
        } catch (e) {}
      }
		}
	}
}
</script>

<style scoped>
  .auth {
    background: var(--secondary-bg);
    width: 100vw;
    height: 100vh;
  }
  .auth__form {
    display: flex;
  }
  .auth__form-validation-invalid {
    color: red
  }
</style>
