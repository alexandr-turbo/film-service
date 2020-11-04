<template>
  <div id="app">
    <SearchBar />
    <router-view />
  </div>
</template>
<script>
import SearchBar from "./components/SearchBar.vue";
export default {
  components: {
    SearchBar
  }
}
</script>
<style>
#app {
  background: lightcyan;
}
button.button {
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
}
button.pretty {
  padding: 10px 20px;
  border-radius: 10px;
  outline: none;
}
.fixed {
  position: fixed;
  z-index: 100500;
  /* margin: auto; */
}
</style>
