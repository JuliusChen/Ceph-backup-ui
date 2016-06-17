<script>
import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const webUrl = 'http://172.25.0.155/api/v1';
// const MockServer = 'http://private-anon-a4e11a3bd-backuprestapi.apiary-mock.com/api/v1';

export default({
  data() {
    return {
      log: 'yes',
    };
  },
  methods: {
    getPoolList() {
      return Vue.http({
        url: `${webUrl}/pools`,
        method: 'GET',
      }).then(
        (res => res.data),
        (res => res.statusText)
      );
    },
    sendBackupTask(Item) {
      return Vue.http({
        url: `${webUrl}/tasks/`,
        method: 'POST',
        data: {
          backup_type: 'pools',
          pools: Item.selectedRADOSPools,
          is_scheduled: false,
        },
      }).then(
        (res => res.data),
        (res => res.statusText)
      );
    },
    getTaskProgress(Task) {
      return Vue.http({
        url: `${webUrl}/tasks/${Task}/progress`,
        method: 'GET',
      }).then(
        (res => res.data),
        (res => res.statusText)
      );
    },
  },
});
</script>
