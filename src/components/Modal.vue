<template>
  <div class="auth">
    <div class="ac">
      <slot name="header" />
      <slot name="main" />
      <slot name="footer" />
    </div>
    <div class="auth2" @click="$emit('outside')" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Modal extends Vue {}
</script>

<style scoped>
.auth {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100500;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100500;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
.ac {
  border-radius: 6px;
  background: var(--accent-color);
  min-width: 280px;
  min-height: auto;
  padding: 1rem;
  z-index: 1005000;
}
</style>
