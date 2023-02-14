<template>
  <div>
    <slot name="main" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class Tooltip extends Vue {}
</script>

<style scoped></style>
