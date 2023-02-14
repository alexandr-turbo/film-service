<template>
  <b-form-group :id="id + 'InputGroup'" :class="classes">
    <label v-if="label" :label="label" :label-for="id" :label-cols="labelCols">
      {{ label }}
    </label>
    <div class="form-input-wrapper">
      <b-form-input
        :id="id"
        :type="type"
        :value="value"
        :min="min"
        :max="max"
        :aria-describedby="id + 'LiveFeedback'"
        :placeholder="placeholder || label"
        v-bind="$attrs"
        @input="updateValue"
      />
    </div>
  </b-form-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class TextInput extends Vue {
  inheritAttrs = false;

  @Prop({
    default: null,
  })
  readonly value!: string | number;

  @Prop({
    default: 'text',
  })
  readonly type!: string;

  @Prop({
    default: '',
  })
  readonly label!: string;

  @Prop({
    default: '',
    required: true,
  })
  readonly id!: string;

  @Prop({
    default: '',
  })
  readonly classes!: string;

  @Prop({
    default: null,
  })
  readonly min!: number;

  @Prop({
    default: null,
  })
  readonly max!: number;

  @Prop({ default: '' })
  placeholder!: string;

  updateValue(newVal: string): void {
    this.$emit('input', newVal);
  }

  onClear(): void {
    this.updateValue('');
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap-vue/dist/bootstrap-vue.css';
.form-input-wrapper {
  position: relative;
}

.uppercase {
  input {
    text-transform: uppercase;
  }

  input::placeholder {
    text-transform: none;
  }
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}

.with-currency {
  display: flex;
  align-items: center;
  .currency {
    margin-left: 16px;
  }
}
</style>
