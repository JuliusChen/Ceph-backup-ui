<template>
  <div>
    <h3>Backup Task</h3>
  </div>

  <div class="row" v-if="!isBackuping">
    <div class="input-field col s12 l6">
        <input id="plan_name" type="text" class="validate">
        <label for="plan_name">Plan Name</label>
    </div>

    <div class="input-field col s12 l6">
      <ui-select name="Directory" label="Backup Directory" :options="backupDirOptions"
        placeholder="Select a directory" v-model="submitItem.backupDirectory">
      </ui-select>
    </div>

    <div class="col s12">
      <ui-tabs fullwidth>
        <ui-tab header="RBD" id="RBD">
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
            <div class="col s12 l6 space">
              <ui-select name="selected pool" label="Select BackUP Pool" :options="RBDpoolLists"
                placeholder="Choose your pool" :value.sync="submitItem.repeated">
              </ui-select>
            </div>
            
            <div class="col s12 l6 sapce">
              <ui-select
                  label="Selected Images" placeholder="Select Backup images" name="backup_images"
                  multiple :options="imageLists" help-text="Select at least 1 iamges"
                  validation-rules="required|min:1"
              ></ui-select>
            </div>

            <hr color="#FFFFF" size="10" width="100%">

            <label for="backupCount">Incremental backup counts between full backup</label>
            <input type="number" v-model="submitItem.backupNumberCount" id="backupCount" min="0" max="100">

            <label for="backupIteraion">Preserve backup iteration count</label>
            <input type="number"  v-model="submitItem.backupInteration" id="backupIteraion" min="0" max="100">
          </div>
        </ui-tab>

        <ui-tab header="RADOS" id="RADOS">
          <div class="col s12 l6 sapce">
            <ui-select
                label="RADOS Pools" placeholder="Select Backup RADOS Pools" name="backup_pools"
                multiple :options="RADOSpoolists" help-text="Select at least 1 pool"
                validation-rules="required|min:1" :value.sync="submitItem.selectedRADOSPools"
            ></ui-select>
          </div>

          <hr color="#FFFFF" size="10" width="100%">
        </ui-tab>
      </ui-tabs>
    </div>

    <div class="input-field col s12 l6">
      <span>Start Date：</span>
      <date-picker :time.sync="starttime" :option="option"></date-picker>
    </div>
    <div class="input-field col s12 l6">
      <span>End time：</span>
      <date-picker :time.sync="endtime" :option="option"></date-picker>
    </div>

    <div class="col s12 l6">
      <ui-select name="RepeatOption" label="Repeat Option" :options="repeatedOptions"
        placeholder="Choose your option" v-model="submitItem.repeated">
      </ui-select>
    </div>

    <div class="col s12">
      <button class="btn waves-effect waves-light space disabled" type="submit" name="action"
        v-if="submitItem.selectedRADOSPools.length==0 ">Submit
        <i class="material-icons right">send</i>
      </button>
      <!-- || state.isRADOSMockData -->
      <!-- && !state.isRADOSMockData -->
      <button class="btn waves-effect waves-light space hoverable" type="submit" name="action"
        v-if="submitItem.selectedRADOSPools.length>0 " v-on:click="submit">Submit
        <i class="material-icons right">send</i>
      </button>
    </div>
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
.tab
{
  padding-left: 2em;
}
.space
{
  margin-top: 1em;
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
import UiSelect from 'keen-ui/lib/UiSelect';
import UiTabs from 'keen-ui/lib/UiTabs';
import UiTab from 'keen-ui/lib/UiTab';
import Xhr from './XhrService.vue';
import myDatepicker from 'vue-datepicker';

export default {
  components: {
    Xhr,
    'date-picker': myDatepicker,
    UiSelect,
    UiTabs,
    UiTab,
  },
  data() {
    return {
      repeatedOptions: ['every day', 'every week', 'every month'],
      backupDirOptions: ['/mnt/BackUP/', '~/Document/BackUP', '~/BackUP'],
      starttime: '',
      endtime: '',
      option: {
        type: 'min',
        week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
         'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD HH:mm',
        placeholder: 'when?',
        color: {
          header: '#26a69a',
          headerText: '#fffff',
        },
        buttons: {
          ok: 'Ok',
          cancel: 'Cancel',
        },
      },
      repeated: '',
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
        backupDirectory: '',
        starttime: '',
        endtime: '',
        repeated: '',
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
    starttime(val) {
      this.submitItem.starttime = this.getTimestamp(val);
    },
    endtime(val) {
      this.submitItem.endtime = this.getTimestamp(val);
    },
  },
  methods: {
    poll() {
      setTimeout(() => {
        this.getTaskProgress(this.taskUUID)
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
      this.getPoolList()
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
      this.sendBackupTask(this.submitItem)
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
    sendBackupTask(item) {
      return Xhr.methods.sendBackupTask(item);
    },
    getPoolList() {
      return Xhr.methods.getPoolList();
    },
    getTaskProgress(UUID) {
      return Xhr.methods.getTaskProgress(UUID);
    },
    getTimestamp(time) {
      const string = time.split(/:|-|\s/);
      const date = new Date(string[0], string[1] - 1, string[2], string[3], string[4]);
      return date.getTime() / 1000;
    },
  },
};
</script>

