import Vue from 'vue';
import Window from 'src/components/window.vue';

describe('Window.vue', () => {
  const vm = new Vue({
    template: '<div><window></window></div>',
    components: { Window },
  }).$mount();

  it('window should render correct contents', () => {
    expect(vm.$el.querySelector('span.black-text').textContent).to.contain('icon window1');

    const WindowButtons = vm.$el.querySelectorAll('li');
    expect(WindowButtons[0].textContent).to.contain('remove');
    expect(WindowButtons[1].textContent).to.contain('check_box_outline_blank');
    expect(WindowButtons[2].textContent).to.contain('close');
  });

  it('window should maximal correctly', () => {

  });
});
