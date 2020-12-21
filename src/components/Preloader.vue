<template>
  <div>
    <div id="page-preloader" class="preloader" v-if="$root.loading">
      <div class="loader"></div>
    </div>
  </div>
</template>
// по моему бессмысленный компонент. не переиспользуется и не имеет отдельной логики. можно было оставить просто html в месте использования