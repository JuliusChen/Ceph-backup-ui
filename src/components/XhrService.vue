<template>
</template>

<style>
</style>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

export default({
  data() {
    return {
      log: 'yes',
    };
  },
  methods: {
    getPoolList() {
      return Vue.http({
        url: 'http://private-anon-aeb6dbe32-backuprestapi.apiary-mock.com/api/v1/pools',
        method: 'GET',
      }).then(
        (res => res.data),
        (res => res.statusText)
      );
    },
  },
});
</script>
