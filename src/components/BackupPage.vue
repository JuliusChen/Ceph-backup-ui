<template>
  <window>
    <div class="row" id="app">
      <div class="col s12 l3">
        <tree-menu>
          <tree-menu-item is-expanded view="ClusterPortal" icon="wifi_tethering" title="Ceph Cluster 1">
            <tree-menu-item is-expanded view="BackupPlan" icon="view_agenda" title="Add Backup Plan"></tree-menu-item>
            <tree-menu-item is-expanded view="TaskList" icon="format_list_bulleted" title="List Backup Tasks"></tree-menu-item>
            <tree-menu-item is-expanded view="PlanList" icon="format_list_bulleted" title="List Plan Tasks"></tree-menu-item>
          </tree-menu-item>
        </tree-menu>
      </div>
      <div class="col s12 l9">
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
import window from './window';
import TreeMenu from './TreeMenu';
import TreeMenuItem from './TreeMenuItem';
import TaskList from './TaskList';
import BackupPlan from './BackupPlan';
import ClusterPortal from './ClusterPortal/ClusterPortal';
import PlanList from './PlanList';

export default {
  components: {
    window,
    TreeMenu,
    TreeMenuItem,
    TaskList,
    PlanList,
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
