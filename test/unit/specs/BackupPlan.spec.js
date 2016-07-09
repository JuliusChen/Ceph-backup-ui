import Vue from 'vue';
import BackupPlan from 'src/components/BackupPlan.vue';

describe('BackupPlan.vue', () => {
  const vm1 = new Vue({
    template: '<div><backup-plan v-ref:component></backup-plan></div>',
    components: {
      BackupPlan,
    },
  }).$mount();

  const PlanMethodCall = vm1.$refs.component;

  it('Backup Plan should render radio buttoms', () => {
    // expect(vm1.$el.querySelector('input[value="RBD"]')).to.exist;
    expect(vm1.$el.querySelector('label[for="radio1"]').textContent)
      .to.contain('RBD(block device)');

    // expect(vm1.$el.querySelector('input[value="RADOS"]')).to.exist;
    expect(vm1.$el.querySelector('label[for="radio4"]').textContent)
      .to.contain('RADOS');
  });

  it('submit method should call sendBackupTask', (done) => {
    // create mock Xhr request result
    const task = sinon.stub(PlanMethodCall, 'sendBackupTask');

    PlanMethodCall.submitItem = {
      selectedRADOSPools: ['rbd', 'rbd2'],
    };

    // after receving Xhr request return Promise
    task.withArgs({ selectedRADOSPools: ['rbd', 'rbd2'] })
       .returns(Promise.resolve({ uuid: '394a8438-3b02-4a8b-97c9-7f2690e539c4' }));

    PlanMethodCall.submit();

    // after stub async method complete to verify
    process.nextTick(() => {
      expect(task).to.have.been.calledWith(PlanMethodCall.submitItem);
      expect(PlanMethodCall.taskUUID).is.equal('394a8438-3b02-4a8b-97c9-7f2690e539c4');
      done();
    });

    task.restore();
  });
});
