<template>
  <div class="c-autoComplete field">
    <label class="label is-small"
           :for="defaults.id ? defaults.id : `auto--${id}`">{{ defaults.label }}</label>
    <div class="control">
      <input @change="clearItem"
             @focusout="focusout"
             @focus="focus"
             @keydown.esc="changeFocus"
             @keydown.40="moveDown"
             @keydown.38="moveUp"
             class="input is-small"
             :disabled="defaults.disabled"
             :id="defaults.id ? defaults.id : `auto--${id}`"
             :placeholder="defaults.placeholder"
             type="text"
             v-model="selected">
      <ul class="c-autoComplete_list"
          :class="{ 'c-autoComplete_list--open': onFocus }">
        <li @click="setItem(option)"
            class="c-autoComplete_list_item"
            :class="{ 'c-autoComplete_list_item--active': ind === selectedInd }"
            :key="ind"
            v-for="(option, ind) in listFiltered">{{ option[defaults.labelItem] }}</li>
      </ul>
      <p class="c-autoComplete_noItems"
         :class="{ 'c-autoComplete_noItems--show': onFocus && !dataList.length }"
         v-if="!dataList.length">{{ defaults.fallback }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AutoComplete',
    props: {
      dataProp: {
        type: Object,
        default: () => { return this.defaults; }
      },
      dataList: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      listFiltered() {
        if (!this.selected) { return this.dataList; }
        return this.dataList.filter(opt => {
          let txt = this.selected.toLowerCase();
          let optTxt = JSON.stringify(opt).toLowerCase();

          if (optTxt.match(txt)) { return opt; }
        });
      },
    },
    data: () => {
      return {
        id: null,
        selectedInd: -1,
        onFocus: false,
        elem: null,
        selected: '',
        defaults: {
          labelItem: 'nome',
          disabled: false,
          label: 'Digite para selecionar',
          fallback: 'Nenhum item encontrado',
          value: '',
          placeholder: 'Campo Autocomplete',
        },
      };
    },
    watch: {
      dataProp(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.changeDefault(newVal);
        }

        if (newVal.value !== this.selected) {
          this.selected = newVal.value;
        }
      },
    },
    methods: {
      checkList() {
        if (!this.selected) { return this.dataList; }
        return this.dataList.filter(opt => {
          let txt = this.selected.toLowerCase();
          let optTxt = JSON.stringify(opt).toLowerCase();

          if (optTxt.match(txt)) { return opt; }
        });
      },
      changeDefault(val) {
        this.defaults = { ...this.defaults, ...val };
      },
      changeFocus() {
        if (this.elem) {
          this.elem.blur();
          this.focusout();
        }
      },
      focus(e) {
        this.elem = e.target;
        this.onFocus = true;
      },
      focusout() {
        if (this.elem) { this.elem = null; }
        this.onFocus = false;
        this.selectedInd = -1;
      },
      setItem(val) {
        this.$emit('OnChange', { ...val });
        return this.focusout();
      },
      clearItem() {
        if (!this.selected) {
          this.$emit('OnChange', { [this.dataProp.labelItem]: '' });
        }
      },
      moveDown() {
        let list = this.checkList();

        if (this.selectedInd < list.length - 1) {
          this.selectedInd++;
        } else {
          this.selectedInd = -1;
        }
      },
      moveUp() {
        if (this.selectedInd !== -1) {
          this.selectedInd--;
        } else {
          this.selectedInd = -1;
        }
      },
    },
    mounted () {
      this.id = this._uid;
      this.changeDefault(this.dataProp);
    }
  };
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';

  .c-autoComplete {
    &_list {
      background-color: $color-white;
      border-radius: pxToRem(6);
      border: pxToRem(2) solid;
      height: 0;
      margin-top: pxToRem(2);
      overflow-y: auto;
      padding: pxToRem(8);
      position: absolute;
      transform: scaleY(0);
      transition: transform .12s .15s linear, height .15s .18s ease-in-out;
      transform-origin: top;
      width: 100%;
      z-index: 100;
      @include scrollbars(pxToRem(8), $color-gray);

      &--open {
        height: pxToRem(112);
        transform: scaleY(1);
      }

      &_item {
        border-radius: pxToRem(6);
        cursor: pointer;
        display: inline-block;
        font-size: pxToRem(12);
        font-weight: 500;
        letter-spacing: pxToRem(1);
        margin-bottom: pxToRem(4);
        padding: pxToRem(4) pxToRem(12);
        width: 100%;

        &--active,
        &:hover {
          background-color: $color-gray;
          color: #fff;
        }
      }
    }

    &_noItems {
      background: $color-white;
      border-radius: pxToRem(6);
      font-size: pxToRem(12);
      font-weight: 500;
      padding: pxToRem(4);
      margin-top: pxToRem(8);
      position: absolute;
      transform: scaleY(0);
      transition: transform .12s .15s linear, height .15s .18s ease-in-out;
      text-align: center;

      &--show {
        transform: scaleY(1);
      }
    }
  }
</style>
