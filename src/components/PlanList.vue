<template>
  <div>
    <h3>Plan List</h3>
  </div>
  <table class="mdl-data-table mdl-js-data-table highlight">
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Creator</th>
        <th>Created at</th>
      </tr>
    </thead>
    <!-- <tbody>
      <tr v-for="task in tasks" track-by="$index">
        <td>{{ $index + 1 }}</td>
        <td>{{ task.backup_type }}</td>
        <td>{{ task.uuid }}</td>
        <td>{{ task.rate }}</td>
        <td v-on:click="showDetail($index)">detail</td>
      </tr>
    </tbody> -->
  </table>
<!--   <message-box :is-show="show" :task="tasks[task_num]">
  </message-box> -->
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>

<script>
import MessageBox from './MessageBox';

export default {
  components: {
    MessageBox,
  },
  data() {
    return {
      show: false,
      task_num: 0,
      tasks: [],
      polling_task: false,
    };
  },
  ready() {
  },
  methods: {
  },
  watch: {
  },
};
</script>
