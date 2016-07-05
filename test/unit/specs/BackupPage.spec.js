import Vue from 'vue';
import BackupPage from 'src/components/BackupPage.vue';

describe('BackupPage.vue', () => {
  const vm = new Vue({
    template: '<div><backup-page></backup-page></div>',
    components: { BackupPage },
  }).$mount();

  it('Backup Page should render correct menu items', () => {
    const menuItems = vm.$el.querySelectorAll('div.tree-menu-item');
    expect(menuItems[0].textContent).to.contain('Ceph Cluster 1');
    expect(menuItems[1].textContent).to.contain('Buliding Up Backup Plan');
    expect(menuItems[2].textContent).to.contain('List Backup Tasks');
  });
});
