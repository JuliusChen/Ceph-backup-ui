<template>
  <window>
    <div class="row" id="app">
      <div class="col-md-3">
        <tree-menu>
          <tree-menu-item is-expanded view="ClusterPortal" icon="wifi_tethering" title="Ceph Cluster 1">
            <tree-menu-item is-expanded view="BackupPlan" icon="view_agenda" title="Buliding Up Backup Plan"></tree-menu-item>
            <tree-menu-item is-expanded view="TaskList" icon="format_list_bulleted" title="List Backup Tasks"></tree-menu-item>
          </tree-menu-item>
        </tree-menu>
      </div>
      <div class="col-md-9">
        <component :is="currentView"></component>
      </div>
    </div>
  </window>
</template>

<style>
h1 {
  color: #42b983;
}
</style>

<script>
import window from './window.vue';
import TreeMenu from './TreeMenu.vue';
import TreeMenuItem from './TreeMenuItem.vue';
import TaskList from './TaskList.vue';
import BackupPlan from './BackupPlan.vue';
import ClusterPortal from './ClusterPortal/ClusterPortal';

export default {
  components: {
    window,
    TreeMenu,
    TreeMenuItem,
    TaskList,
    BackupPlan,
    ClusterPortal,
  },
  data() {
    return {
      currentView: 'ClusterPortal',
    };
  },
  events: {
    changeView(view) {
      this.currentView = view;
    },
  },
};
</script>
