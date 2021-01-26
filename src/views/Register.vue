<template>
  <div class="background">
		<form @submit.prevent="register">
			<input type="text" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" />
      <small class="invalid" v-if="$v.email.$dirty && !$v.email.required">Email is required</small>
      <small class="invalid" v-else-if="$v.email.$dirty && !$v.email.email">Type correct email</small>
			
      <input type="password" v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" />
      <small class="invalid" v-if="$v.password.$dirty && !$v.password.required">Password is required</small>
      <small class="invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Password must be {{$v.password.$params.minLength.min}} symbols. Now it is {{ password.length }} symbols</small>
			
      <input type="text" v-model.trim="name" :class="{invalid: $v.email.$dirty && !$v.email.required}">
      <small class="invalid" v-if="$v.name.$dirty && !$v.name.required">Name is required</small>
			<button type="submit">submit</button>
		</form>
    <div>
      Already registered?
    </div>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
			email: '',
			password: '',
			name: ''
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required }
  },
	created() {
		this.$root.loading = false
	},
	methods: {
		async register() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
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
		}
	}
}
</script>

<style scoped>
  .background {
    background: var(--secondary-bg);
    width: 100vw;
    height: 100vh;
  }
  .invalid {
    color: red
  }
  /* .flex {
    display: flex;
    flex-direction: column;
  }
  .flex-row {
    display: flex;
  } */
</style>
