import Vue from 'vue';
import BackupPlan from 'src/components/BackupPlan.vue';

describe('BackupPlan.vue', () => {
  const vm = new Vue({
    template: '<div><backup-plan></backup-plan></div>',
    components: { BackupPlan },
  }).$mount();

  it('Backup Plan should render radio buttoms', () => {
    expect(vm.$el.querySelector('input[value="RBD"]')).to.exist;
    expect(vm.$el.querySelector('label[for="radio1"]').textContent)
      .to.contain('RBD(block device)');

    expect(vm.$el.querySelector('input[value="RADOS"]')).to.exist;
    expect(vm.$el.querySelector('label[for="radio4"]').textContent)
      .to.contain('RADOS');
  });
});
