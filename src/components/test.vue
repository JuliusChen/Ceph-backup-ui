<template>
  <div class="test">
    <h1>{{ msg }}</h1>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>

<script>
export default {
  data() {
    return {
      msg: 'Hello Test',
    };
  },
};
</script>

