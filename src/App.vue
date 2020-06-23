<template>
  <div id="app"
       class="l-app">
    <router-view/>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: 'App',
    data: () => {
      return {};
    },
    computed: {
      ...mapGetters(['getWindowInfo']),
    },
    created() {
      window.addEventListener('resize',this.windowResize);
      this.windowResize();
    },
    destroyed() {
      window.removeEventListener('resize', this.windowResize);
    },
    methods: {
      windowResize() {
        let sizes = { h: window.innerHeight, w: window.innerWidth };
        return this.$store.dispatch('resizeWindow', sizes);
      },
    },
  };
</script>

<style lang="scss">
  @import 'assets/css/_app';
</style>
