<template>
  <h5>Ceph Cluster 0</h5>
  <div class="row">
    <icon-button class="col s4" icon="backup" subject="Backup now"></icon-button>
    <icon-button class="col s4"icon="restore" subject="Restore"></icon-button>
  </div>
  <div class="row">
    <icon-button class="col s4" icon="add_box" subject="Create Backup Plan"></icon-button>
    <icon-button class="col s4" icon="message" subject="Notify Settings"></icon-button>
  </div>
  <alert-table></alert-table>
  <activity-table></activity-table>
</template>

<script>
import IconButton from './IconButton.vue';
import AlertTable from './AlertTable.vue';
import ActivityTable from './ActivityTable.vue';

export default {
  components: {
    IconButton,
    AlertTable,
    ActivityTable,
  },
};
</script>

<style lang="scss">
</style>
