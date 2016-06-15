<template>
  <div>
    <form class="col s12">
      <input value="RBD" type="radio" id="radio1" v-model="picked"/>
      <label for="radio1">RBD(block device)</label><br>
      <div v-if="state.isRBD">
        <input value="yes" type="radio" id="radio2" v-model="selected"/>
        <label for="radio2">Backup RBD Pools Image</label><br>
        <div v-if="state.useRBDPool">

          <div v-for="pool in RBDpoolLists">
            <input value="{{ pool }}" type="checkbox" id="{{ pool }}" v-model="submit.selectedRBDPools"/>
            <label for="{{ pool }}">{{ pool }}</label><br>
          </div>
        </div>

        <input value="no" type="radio" id="radio3" v-model="selected"/>
        <label for="radio3">Backup Selected Pool and Specified Images</label><br>
          <div v-if="state.useRBDImage">
            <select class="browser-default" v-model="submit.selectedRBDPool">
              <option value="" disabled selected>Choose your pool</option>
              <option v-for="pool in RBDpoolLists" value="{{ pool }}">{{ pool }}</option>
            </select>
            <div class="FixedHeightContainer">
              <span>Selected Images</span>
              <div class="Content">
                <div v-for="image in imageLists">
                  <input value="{{ image }}" type="checkbox" id="{{ image }}" v-model="submit.selectedimages"/>
                  <label for="{{ image }}">{{ image }}</label><br>
                </div>
              </div>
            </div>
          </div>
      </div>

      <input value="RADOS" type="radio" id="radio4" v-model="picked"/>
      <label for="radio4">RADOS</label><br>  
      <div v-if="state.isRADOS">
        <div class="FixedHeightContainer">
          <span>Selected Backup pools</span>
          <div class="Content">
            <div v-for="pool in RADOSpoolists">
              <input value="{{ pool }}" type="checkbox" id="{{ pool }}" v-model="submit.selectedRADOSPools"/>
              <label for="{{ pool }}">{{ pool }}</label><br>
            </div>
          </div>
        </div>
      </div>

    </form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
.FixedHeightContainer
{
  float:left;
  height:250px;
  width:100%; 
  padding:3px; 
    background:#a9a;
}
.Content
{
  height:224px;
   overflow:auto;
    background:#fff;
}
</style>

<script>
export default {
  data() {
    return {
      picked: '',
      selected: '',
      state: {
        isRBD: false,
        isRADOS: false,
        useRBDPool: false,
        useRBDImage: false,
      },
      submit: {
        selectedRBDPools: [],
        selectedRBDPool: '',
        selectedRADOSPools: [],
        selectedimages: [],
      },
      RBDpoolLists: ['RBD pool 0', 'RBD pool 1', 'RBD pool 2'],
      RADOSpoolists: ['.rgw.root', '.rgw.control', '.rgw.gc', '.rgw.buckets', '.rgw.index',
       '.rgw.extra', '.log', '.intent-log', '.usage', '.users', '.users.email'],
      imageLists: [],
    };
  },
  created() {
    for (let i = 0; i < 100; i++) {
      this.imageLists[i] = `pool-image${i}`;
    }
  },
  watch: {
    picked(val) {
      if (val === 'RBD') {
        this.state.isRBD = true;
        this.state.isRADOS = false;
        this.submit.selectedRADOSPools = [];
      } else if (val === 'RADOS') {
        this.state.isRADOS = true;
        this.state.isRBD = false;
        this.submit.selectedRBDPools = [];
        this.submit.selectedimages = [];
      }
    },
    selected(val) {
      if (val === 'yes') {
        this.state.useRBDPool = true;
        this.state.useRBDImage = false;
        this.submit.selectedimages = [];
        this.submit.selectedRBDPool = '';
      } else if (val === 'no') {
        this.state.useRBDImage = true;
        this.state.useRBDPool = false;
        this.submit.selectedRBDPools = [];
      }
    },
  },
  methods: {
  },
};
</script>

