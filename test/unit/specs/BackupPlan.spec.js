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
    expect(vm1.$el.querySelector('label[for="radio1"]').textContent)
      .to.contain('RBD(block device)');

    expect(vm1.$el.querySelector('label[for="radio4"]').textContent)
      .to.contain('RADOS');
  });

  it('submit method should call sendBackupTask', (done) => {
    // create mock Xhr request result
    const task = sinon.stub(PlanMethodCall, 'sendBackupTask');

    PlanMethodCall.submitItem = {
      selectedRADOSPools: ['rbd', 'rbd2'],
    };

    PlanMethodCall.starttime = '2016-08-01 17:00';
    PlanMethodCall.endtime = '2017-08-01 18:00';

    // after receving Xhr request return Promise
    task.withArgs(PlanMethodCall.submitItem)
       .returns(Promise.resolve({ uuid: '394a8438-3b02-4a8b-97c9-7f2690e539c4' }));

    PlanMethodCall.submit();

    // after stub async method complete to verify
    process.nextTick(() => {
      done();
      expect(task).to.have.been.calledWith(PlanMethodCall.submitItem);
      expect(PlanMethodCall.taskUUID).is.equal('394a8438-3b02-4a8b-97c9-7f2690e539c4');
      PlanMethodCall.isBackuping = false;
      PlanMethodCall.taskUUID = '';
    });

    task.restore();
  });

  it('reset method should call getPoolList', (done) => {
    // create mock Xhr request result
    const task = sinon.stub(PlanMethodCall, 'getPoolList');

    // after receving Xhr request return Promise
    task.returns(Promise.resolve(
      [
        {
          name: '.rgw.root',
          is_onbackup: false,
        },
        {
          name: '.rgw.control',
          is_onbackup: false,
        },
        {
          name: '.rgw.gc',
          is_onbackup: false,
        },
        {
          name: '.rgw.buckets',
          is_onbackup: false,
        },
      ]
    ));

    PlanMethodCall.reset();

    // after stub async method complete to verify
    process.nextTick(() => {
      expect(PlanMethodCall.RADOSpoolists).to.eql(['.rgw.root', '.rgw.control', '.rgw.gc',
             '.rgw.buckets']);
      done();
    });

    task.restore();
  });

  it('poll method should call getTaskProgress', (done) => {
    // create mock Xhr request result
    const task = sinon.stub(PlanMethodCall, 'getTaskProgress');
    // set Fake Timer
    const clock = sinon.useFakeTimers();

    task.withArgs('394a8438-3b02-4a8b-97c9-7f2690e539c4')
       .returns(Promise.resolve({ progress: 40 }));

    PlanMethodCall.taskUUID = '394a8438-3b02-4a8b-97c9-7f2690e539c4';

    PlanMethodCall.poll();

    // invoke setTimeout after 1000ms
    clock.tick(1100);

    // after stub async method complete to verify
    process.nextTick(() => {
      expect(task.called).is.equal(true);
      done();
    });

    clock.restore();
    task.restore();
  });

  it('Date format should tranfer to timestamp format correctly', (done) => {
    PlanMethodCall.starttime = '2016-08-02 19:57';
    PlanMethodCall.endtime = '2017-08-03 16:42';

    const timestamp = sinon.spy(PlanMethodCall, 'getTimestamp');

    process.nextTick(() => {
      expect(timestamp.called).is.equal(true);
      expect(PlanMethodCall.submitItem.starttime).is.equal(1470139020);
      expect(PlanMethodCall.submitItem.endtime).is.equal(1501749720);
      done();
    });
  });
});