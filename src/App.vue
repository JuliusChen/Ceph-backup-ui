<template>
    <backup-page></backup-page>
</template>

<script>
require('materialize-css/dist/css/materialize.min.css');
require('material-design-icons/iconfont/material-icons.css');
import BackupPage from './components/BackupPage.vue';

export default {
  components: {
    BackupPage,
  },
  data: () => ({
    currentView: '',
  }),
};
</script>

<style>
</style>
