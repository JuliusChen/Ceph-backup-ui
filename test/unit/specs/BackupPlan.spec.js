import Vue from 'vue';
import BackupPlan from 'src/components/BackupPlan.vue';

describe('BackupPlan.vue', () => {
  const vm = new Vue({
    template: '<div><backup-plan></backup-plan></div>',
    components: { BackupPlan },
  }).$mount();

  it('Backup Plan should render correct contents', () => {
    const menuItems = vm.$el.querySelectorAll('div.tree-menu-item');
    expect(menuItems[0].textContent).to.contain('Ceph Cluster 1');
    expect(menuItems[1].textContent).to.contain('Buliding Up Backup Plan');
    expect(menuItems[2].textContent).to.contain('List Backup Tasks');
  });
});
