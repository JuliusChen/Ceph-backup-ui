<template>
  <div v-if="!isBackuping">
    <form class="col s12">
      <input value="RBD" type="radio" id="radio1" v-model="picked"/>
      <label for="radio1">RBD(block device)</label><br>
      <div v-if="state.isRBD" class="tab">
        <input value="RBDPool" type="radio" id="radio2" v-model="selected"/>
        <label for="radio2">Backup RBD Pools</label><br>
        <div v-if="state.useRBDPool">

          <div v-for="pool in RBDpoolLists" class="tab">
            <input value="{{ pool }}" type="checkbox" id="{{ pool }}" v-model="submitItem.selectedRBDPools"/>
            <label for="{{ pool }}">{{ pool }}</label><br>
          </div>
        </div>

        <input value="RBDImage" type="radio" id="radio3" v-model="selected"/>
        <label for="radio3">Backup Selected Pool and Specified Images</label><br>
          <div v-if="state.useRBDImage">
            <select class="browser-default" v-model="submitItem.selectedRBDPool">
              <option value="" disabled selected>Choose your pool</option>
              <option v-for="pool in RBDpoolLists" value="{{ pool }}">{{ pool }}</option>
            </select>
            <div class="FixedHeightContainer">
              <span>Selected Images</span>
              <div class="Content">
                <div v-for="image in imageLists">
                  <input value="{{ image }}" type="checkbox" id="{{ image }}" v-model="submitItem.selectedimages"/>
                  <label for="{{ image }}">{{ image }}</label><br>
                </div>
              </div>
            </div>
            <div>
              <label for="backupCount">Incremental backup counts between full backup</label>
              <input type="number" placeholder="Pick a number" v-model="submitItem.backupNumberCount" id="backupCount" min="0" max="100">
              <label for="backupIteraion">Preserve backup iteration count</label>
              <input type="number" placeholder="Pick a number" v-model="submitItem.backupInteration" id="backupIteraion" min="0" max="100">
            </div>
          </div>
      </div>

      <input value="RADOS" type="radio" id="radio4" v-model="picked"/>
      <label for="radio4">RADOS</label><br>  
      <div v-if="state.isRADOS" class="tab">
        <div class="FixedHeightContainer">
          <span>Selected Backup pools</span>
          <div class="Content">
            <div v-for="pool in RADOSpoolists">
              <input value="{{ pool }}" type="checkbox" id="{{ pool }}" v-model="submitItem.selectedRADOSPools"/>
              <label for="{{ pool }}">{{ pool }}</label><br>
            </div>
          </div>
        </div>
      </div>
    </form>

    <button class="btn waves-effect waves-light space disabled" type="submit" name="action"
      v-if="submitItem.selectedRADOSPools.length==0 || state.isRADOSMockData">Submit
      <i class="material-icons right">send</i>
    </button>

    <button class="btn waves-effect waves-light space" type="submit" name="action"
      v-if="submitItem.selectedRADOSPools.length>0 && !state.isRADOSMockData" v-on:click="submit">Submit
      <i class="material-icons right">send</i>
    </button>
  </div>

  <div v-if="isBackuping">
    <div class="preloader-wrapper big active center">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
      </div><div class="gap-patch">
        <div class="circle"></div>
      </div><div class="circle-clipper right">
        <div class="circle"></div>
        </div>
      </div>
    </div>
    <span class="centerPading">{{taskProgress}} %</span>
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
  height:140px;
  width:100%; 
  padding:3px; 
  background:#a9a;
}
.Content
{
  height:114px;
  overflow:auto;
  background:#fff;
}
.tab
{
  padding-left: 2em;
}
.tab2
{
  padding-left: 4em;
}
.space
{
  margin-top: 2em;
}
.center
{
  position: absolute;
  top: 50%;
  left: 50%;
}
.centerPading
{
  position: absolute;
  top: 2em;
  left: 52%;
}
</style>

<script>
import Xhr from './XhrService.vue';

export default {
  components: {
    Xhr,
  },
  data() {
    return {
      picked: '',
      selected: '',
      isBackuping: false,
      taskUUID: '',
      taskProgress: '',
      state: {
        isRBD: false,
        isRADOS: false,
        useRBDPool: false,
        useRBDImage: false,
        isRADOSMockData: true,
      },
      submitItem: {
        selectedRBDPools: [],
        selectedRBDPool: '',
        selectedRADOSPools: [],
        selectedimages: [],
        backupNumberCount: '',
        backupIteration: '',
      },
      RBDpoolLists: ['RBD pool 0', 'RBD pool 1', 'RBD pool 2'],
      RADOSpoolists: [],
      imageLists: [],
    };
  },
  created() {
    for (let i = 0; i < 100; i++) {
      this.imageLists[i] = `pool-image${i}`;
    }
  },
  ready() {
    this.reset();
  },
  watch: {
    picked(val) {
      if (val === 'RBD') {
        this.state.isRBD = true;
        this.state.isRADOS = false;
        this.submitItem.selectedRADOSPools = [];
      } else if (val === 'RADOS') {
        this.state.isRADOS = true;
        this.state.isRBD = false;
        this.submitItem.selectedRBDPools = [];
        this.submitItem.selectedimages = [];
        this.backupNumberCount = '';
        this.backupIteration = '';
      }
    },
    selected(val) {
      if (val === 'RBDPool') {
        this.state.useRBDPool = true;
        this.state.useRBDImage = false;
        this.submitItem.selectedimages = [];
        this.submitItem.selectedRBDPool = '';
      } else if (val === 'RBDImage') {
        this.state.useRBDImage = true;
        this.state.useRBDPool = false;
        this.submitItem.selectedRBDPools = [];
        this.backupNumberCount = '';
        this.backupIteration = '';
      }
    },
    isBackuping(val) {
      if (val === true) {
        this.poll();
      }
    },
  },
  methods: {
    poll() {
      setTimeout(() => {
        Xhr.methods.getTaskProgress(this.taskUUID)
        .then((res) => {
          if (res.progress !== 100) {
            this.taskProgress = res.progress;
            this.poll();
          } else {
            this.taskUUID = '';
            this.isBackuping = false;
            this.taskProgress = 0;
          }
        });
      }, 1000);
    },
    reset() {
      Xhr.methods.getPoolList()
      .then(
        (res) => {
          if (typeof res === 'object') {
            this.RADOSpoolists = res.map(v => !v.is_onbackup ? v.name : undefined).filter(v => !!v);
            this.state.isRADOSMockData = false;
          } else {
            this.RADOSpoolists = ['.rgw.root', '.rgw.control', '.rgw.gc',
             '.rgw.buckets', '.rgw.index', '.rgw.extra', '.log', '.intent-log',
             '.usage', '.users', '.users.email'];
            this.state.isRADOSMockData = true;
          }
        });

      this.state.isRBD = false;
      this.state.isRADOS = true;
      this.state.useRBDPool = false;
      this.state.useRBDImage = false;
      this.submitItem.selectedRBDPools = [];
      this.submitItem.selectedRBDPool = '';
      this.submitItem.selectedRADOSPools = [];
      this.submitItem.selectedimages = [];
      this.submitItem.backupNumberCount = '';
      this.submitItem.backupIteration = '';
    },
    submit() {
      Xhr.methods.sendBackupTask(this.submitItem)
      .then(
        (res) => {
          if (typeof res === 'object') {
            this.taskUUID = res.uuid;
            this.isBackuping = true;
          } else {
            console.log(res);
          }
        });

      this.reset();
    },
  },
};
</script>

