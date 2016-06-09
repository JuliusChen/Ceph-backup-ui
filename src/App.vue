<template>
  <window>
    <tree-menu>
      <tree-menu-item is-expanded text="test"></tree-menu-item>
      <tree-menu-item is-expanded text="Hello"></tree-menu-item></tree-menu-item>
    </tree-menu>
  </window>
</template>

<script>
require('materialize-css/dist/css/materialize.min.css');
require('material-design-icons/iconfont/material-icons.css');
import window from './components/window.vue';
import TreeMenu from './components/TreeMenu.vue';
import TreeMenuItem from './components/TreeMenuItem.vue';

export default {
  components: {
    window,
    TreeMenu,
    TreeMenuItem,
  },
  data: () => ({
    currentView: '',
  }),
  events: {
    listenChange(view) {
      this.currentView = view;
      this.$broadcast('changeview', this.currentView);
    },
  },
};
</script>

<style>
</style>
