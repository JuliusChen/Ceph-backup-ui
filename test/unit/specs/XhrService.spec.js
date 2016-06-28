import Vue from 'vue';
import Xhr from 'src/components/XhrService.vue';
import chai from 'chai';

const expect = chai.expect;
const assert = chai.assert;

describe('Xhr.vue', () => {
  const vm = new Vue({
    template: '<div><Xhr v-ref:component></Xhr></div>',
    components: { Xhr },
  }).$mount();

  const XhrRequest = vm.$refs.component;

  it('getPoolList should return an object', (done) => {    
    XhrRequest.getPoolList().then((data) => {
      expect(typeof data).is.equal('object');
      done();
    }, (error) => {
      assert.fail(error);
      done();
    });
  });
});
