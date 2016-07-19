import Vue from 'vue';
import TaskList from 'src/components/TaskList.vue';

describe('TaskList.vue', () => {
  const vm1 = new Vue({
    template: '<div><task-list v-ref:component></task-list></div>',
    components: {
      TaskList,
    },
  }).$mount();

  it('Task List should render table title', () => {
    const TableTitle = vm1.$el.querySelectorAll('th');
    expect(TableTitle[0].textContent).to.contain('No');
    expect(TableTitle[1].textContent).to.contain('type');
    expect(TableTitle[2].textContent).to.contain('task name');
    expect(TableTitle[3].textContent).to.contain('progress');
    expect(TableTitle[4].textContent).to.contain('detail');
  });
});
