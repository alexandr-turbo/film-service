<template>
  <div class="background">
    <!-- <form class="flex-row" @submit.prevent="login"> -->
    <form @submit.prevent="login">
      <input type="text" v-model.trim="email" :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}" />
      <small class="invalid" v-if="$v.email.$dirty && !$v.email.required">Email is required</small>
      <small class="invalid" v-else-if="$v.email.$dirty && !$v.email.email">Type correct email</small>
      
      <input type="password" v-model.trim="password" :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}" />
      <small class="invalid" v-if="$v.password.$dirty && !$v.password.required">Password is required</small>
      <small class="invalid" v-else-if="$v.password.$dirty && !$v.password.minLength">Password must be {{$v.password.$params.minLength.min}} symbols. Now it is {{ password.length }} symbols</small>
      
      <button type="submit">submit</button>
    </form>
    <div>
      No account?
    </div>
    <router-link to="/register">Register</router-link>
  </div>
</template>

<script>
import { email, required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  created() {
    this.$root.loading = false;
  },
  methods: {
    async login() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push("/");
        // console.log(await this.$store.getters.info.name)
        // eslint-disable-next-line no-empty
      } catch (e) {}
    },
  },
};
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
