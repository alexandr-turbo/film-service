<template>
  <div class="not-found__container">
    <div class="not-found">
      {{ 'page-not-found' | localize }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class NotFound extends Vue {
  created() {
    (this.$root.$emit as any)('isLoading', false);
  }
}
</script>

<style scoped>
.not-found__container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  height: calc(100vh - 390px); /* 310px - footer, 80px - searchbar */
  width: 100vw;
  color: black;
}
</style>
