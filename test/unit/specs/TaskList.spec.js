import Vue from 'vue';
import TaskList from 'src/components/TaskList.vue';

describe('TaskList.vue', () => {
  const vm1 = new Vue({
    template: '<div><task-list v-ref:component></task-list></div>',
    components: {
      TaskList,
    },
  }).$mount();

  const TaskListCall = vm1.$refs.component;

  it('Task List should render table title', () => {
    const TableTitle = vm1.$el.querySelectorAll('th');
    expect(TableTitle[0].textContent).to.contain('No');
    expect(TableTitle[1].textContent).to.contain('type');
    expect(TableTitle[2].textContent).to.contain('task name');
    expect(TableTitle[3].textContent).to.contain('progress');
    expect(TableTitle[4].textContent).to.contain('detail');
  });

  it('Task List should update rate after get task progress', (done) => {
    const getTaskProgress = sinon.stub(TaskListCall, 'getTaskProgress');

    // set Fake Timer
    const clock = sinon.useFakeTimers();

    getTaskProgress.withArgs('394a8438-3b02-4a8b-97c9-7f2690e539c4')
      .returns(Promise.resolve({ progress: 40 }));

    TaskListCall.update_rate([0, { uuid: '394a8438-3b02-4a8b-97c9-7f2690e539c4' }]);

    // invoke setTimeout after 1000ms
    clock.tick(1100);

    // after stub async method complete to verify
    process.nextTick(() => {
      expect(getTaskProgress.called).is.equal(true);
      expect(TaskListCall.tasks[0].rate).is.equal(40);
      done();
    });
  });
});
