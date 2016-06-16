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
    sendBackupTask(Item) {
      return Vue.http({
        url: 'http://private-anon-aeb6dbe32-backuprestapi.apiary-mock.com/api/v1/tasks',
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
  },
});
</script>
