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

  it('getPoolList should return an object with correct property', (done) => {
    const get = sinon.stub(XhrRequest, 'getPoolList');

    get.returns(Promise.resolve(
      [
        {
          is_onbackup: true,
          name: 'rbd',
        },
        {
          is_onbackup: true,
          name: 'rbd2',
        },
        {
          is_onbackup: false,
          name: 'rbd3',
        },
        {
          is_onbackup: false,
          name: 'rbd4',
        },
        {
          is_onbackup: false,
          name: 'rbd5',
        },
      ]
    ));

    XhrRequest.getPoolList()
    .then((data) => {
      done();
      expect(typeof data).is.equal('object');
      expect(data[0].hasOwnProperty('name') &&
        data[0].hasOwnProperty('is_onbackup')).is.equal(true);
    }, (error) => {
      assert.fail(error);
    });

    get.restore();
  });

  it('getTaskProgress should return an object with correct property', (done) => {
    // create mock Xhr request result
    const get = sinon.stub(XhrRequest, 'getTaskProgress');

    // after receving Xhr request return Promise
    get.withArgs('394a8438-3b02-4a8b-97c9-7f2690e539c4')
      .returns(Promise.resolve({ progress: 40 }));

    XhrRequest.getTaskProgress('394a8438-3b02-4a8b-97c9-7f2690e539c4')
    .then((data) => {
      done();
      expect(typeof data).is.equal('object');
      expect(data.hasOwnProperty('progress')).is.equal(true);
    }, (error) => {
      assert.fail(error);
    });

    get.restore();
  });

  it('sendBackupTask should return an object with correct property', (done) => {
    // create mock Xhr request result
    const post = sinon.stub(XhrRequest, 'sendBackupTask');

    // after receving Xhr request return Promise
    post.returns(Promise.resolve({ uuid: '394a8438-3b02-4a8b-97c9-7f2690e539c4' }));

    XhrRequest.sendBackupTask({ selectedRADOSPools: ['rbd', 'rbd2'] })
    .then((data) => {
      done();
      expect(typeof data).is.equal('object');
      expect(data.hasOwnProperty('uuid')).is.equal(true);
    }, (error) => {
      assert.fail(error);
    });

    post.restore();
  });
});
