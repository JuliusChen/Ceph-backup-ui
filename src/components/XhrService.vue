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
    getPool() {
      return Vue.http({
        url: '/test',
        method: 'GET',
      }).then((res) => {
        console.log('Impossible');
        console.log(res);
      }, (res) => {
        console.log('WTF');
        console.log(res);
      });
    },
  },
});
</script>
