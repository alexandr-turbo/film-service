import CSelect from '@/components/controls/form/CSelect.vue';
import CMultiselect from '@/components/controls/form/CMultiselect.vue';
import CLink from '@/components/controls/form/CLink.vue';

export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  install(Vue: any): void {
    Vue.component('CSelect', CSelect);
  },
};
