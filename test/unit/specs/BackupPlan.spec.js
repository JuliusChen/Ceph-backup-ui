import Vue from 'vue';
import BackupPlan from 'src/components/BackupPlan.vue';

describe('BackupPlan.vue', () => {
  const vm = new Vue({
    template: '<div><backup-plan></backup-plan></div>',
    components: { BackupPlan },
  }).$mount();

  it('Backup Plan should render correct contents', () => {
    
  });
});
