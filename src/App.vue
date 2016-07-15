<template>
    <backup-page></backup-page>
</template>

<script>
import 'materialize-css/bin/materialize.css';
import 'materialize-css/bin/materialize.js';
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
