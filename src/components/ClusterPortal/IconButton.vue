<template>
  <div class="icon-button green lighten-5 grey-text text-darken-3">
    <i class="material-icons left medium">{{ icon }}</i>
    <div style="padding-top:20px;">{{ subject }}</div>
  </div>
</template>

<script>
export default {
  props: {
    icon: '',
    subject: '',
  },
};
</script>

<style lang="scss">
.icon-button {
  padding-bottom: 50px;
}
</style>
