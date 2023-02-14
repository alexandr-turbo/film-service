import CSelect from '@/components/controls/form/CSelect.vue';

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(Vue: any): void {
    Vue.component('CSelect', CSelect);
  },
};
