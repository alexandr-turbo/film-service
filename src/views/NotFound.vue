<template>
  <div class="not-found__container">
    <div class="not-found">
      {{'page-not-found' | localize}}
    </div>
  </div>
</template>

<script>

export default {
  created() {
    this.$root.loading = false
  }
}
  
</script>

<style scoped>
.not-found__container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  /* height: 65vh; */
  height: calc(100vh - 390px); /* 310px - footer, 80px - searchbar */
  width: 100vw;
  color: black;
}
</style>
