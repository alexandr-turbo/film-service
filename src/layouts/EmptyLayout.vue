<template>
  <div>
    <router-view />
  </div>
</template>

<script>
  export default {
    mounted() {
      let el = document.documentElement
      if(localStorage.getItem('theme') !== null) {
        el.setAttribute('data-theme', 'light')
      }
    }
  }
</script>
