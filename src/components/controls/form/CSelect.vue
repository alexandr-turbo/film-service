<template>
  <div class="c-select">
    <Multiselect
      v-bind="{
        id,
        value,
        label,
        trackBy,
        loading,
        options,
        multiple,
        disabled,
        searchable,
        allowEmpty,
        placeholder,
        selectLabel,
      }"
      deselect-label=""
      selected-label=""
      select-label=""
      @input="$emit('input', $event)"
      @search-change="$emit('search-change', $event)"
    >
      <template v-if="noOptionsMsg" #noOptions>
        <span>{{ noOptionsMsg }}</span>
      </template>

      <template #option="props">
        <slot :props="props" name="option" />
      </template>

      <template slot="afterList">
        <slot name="afterList" />
      </template>
    </Multiselect>
    <b-button
      v-if="clearBtn && value"
      variant="link"
      class="clear-btn"
      @click="$emit('input', null)"
    >
      <em class="fa fa-remove" />
    </b-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Multiselect from 'vue-multiselect';

@Component({
  components: {
    Multiselect,
  },
})
export default class CSelect extends Vue {
  @Prop({
    default: '',
  })
  readonly id!: string;

  @Prop({
    default: null,
  })
  readonly value!: any;

  @Prop({
    default: false,
  })
  readonly disabled?: boolean;

  @Prop({
    default: false,
  })
  readonly loading!: boolean;

  @Prop({
    default: [],
  })
  readonly options!: Array<any>;

  @Prop({})
  readonly noOptionsMsg!: string;

  @Prop({
    default: '',
  })
  readonly trackBy!: string;

  @Prop({
    default: '',
  })
  readonly label!: string;

  @Prop({
    default: false,
  })
  readonly multiple?: boolean;

  @Prop({
    default: false,
  })
  readonly searchable?: boolean;

  @Prop({
    default: '',
  })
  readonly placeholder?: string;

  @Prop({
    default: false,
  })
  readonly allowEmpty!: boolean;

  @Prop({
    default: undefined,
  })
  readonly selectLabel!: string;

  @Prop({
    default: false,
  })
  clearBtn!: boolean;
}
</script>

<style lang="scss">
@import '~vue-multiselect/dist/vue-multiselect.min.css';
@import '@/assets/styles/_variables.scss';

.multiselect {
  // min-height: 35px;

  .multiselect__content-wrapper {
    background-color: $white;
    color: #e4e7ea;
    z-index: 2;

    .multiselect__option {
      text-overflow: ellipsis;
      overflow: hidden;
      color: black;
    }

    .multiselect__option--highlight {
      background: $bootstrap-primary;

      &::after {
        background: $bootstrap-primary;
      }
    }
  }

  .multiselect__tag {
    margin-bottom: 0;
  }

  .multiselect__tags {
    min-height: 35px;
    padding: 4px 30px 0 5px;
    background: $white;

    .multiselect__tag {
      background: $white;

      .multiselect__tag-icon:hover {
        &:hover {
          background: $bootstrap-primary-hover;
        }
      }
    }

    .multiselect__placeholder {
      opacity: 1;
      margin-bottom: 0;
      padding-top: 0;
    }
  }

  .multiselect__input {
    background: $white;
    color: black;

    &::placeholder {
      opacity: 0;
    }
  }

  .multiselect__spinner {
    background: $bootstrap-form-control-grey;
    height: 31px;
    border-radius: 5px;
  }

  .multiselect__single {
    margin: 2px 0 0;
    background: $white;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &.multiselect--disabled {
    background: none;

    .multiselect__tags,
    .multiselect__single,
    .multiselect__select {
      background: none;
    }
  }
}

.c-select {
  position: relative;

  .clear-btn {
    position: absolute;
    right: 35px;
    top: 50%;
    transform: translateY(-50%);
    padding: 0;
    color: #73818f;
    transition: all 0.3s;

    &:hover {
      color: #fff;
    }
  }
}
</style>
