<template>
  <window>
    <backup-page></backup-page>
  </window>
</template>

<script>
require('materialize-css/dist/css/materialize.min.css');
require('material-design-icons/iconfont/material-icons.css');
import window from './components/window.vue';
import BackupPage from './components/BackupPage.vue';

export default {
  components: {
    window,
    BackupPage,
  },
  data: () => ({
    currentView: '',
  }),
};
</script>

<style>
</style>
