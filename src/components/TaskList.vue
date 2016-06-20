<template>
  <div>
    <h3>Task List</h3>
  </div>
  <table class="mdl-data-table mdl-js-data-table">
    <thead>
      <tr>
        <th>No</th>
        <th>type</th>
        <th>task name</th>
        <th>progress</th>
        <th>detail</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in tasks" track-by="$index">
        <td>{{ $index + 1 }}</td>
        <td>{{ task.backup_type }}</td>
        <td>{{ task.uuid }}</td>
        <td>{{ task.rate }}</td>
        <td v-on:click="showDetail($index)">detail</td>
      </tr>
    </tbody>
  </table>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>

<script>
const async = require('async');
const $ = require('jquery');


export default {
  data() {
    return {
      show: false,
      task_num: 0,
      tasks: [],
      polling_task: false,
    };
  },
  ready() {
    $.get('/api/v1/tasks/', (result) => {
      this.$data.tasks = result;
      for (const task of this.$data.tasks) {
        let rate = 0;
        if (!task.progressing) { rate = 100; }
        task.rate = rate;
      }
      this.$data.polling_task = true;
    });
  },
  methods: {
    showDetail(i) {
      this.show = !this.show;
      this.task_num = i;
    },
    update_rate(task) {
      setTimeout(() => {
        $.get(`/api/v1/tasks/${task[1].uuid}/progress`, (result) => {
          if (result.progress < 100 && result.progress !== null) {
            this.update_rate(task);
          }
        });
      }, 1000);
    },
  },
  watch: {
    polling_task() {
      const tasks = this.tasks.entries();
      async.map(tasks, (task) => {
        this.update_rate(task);
      });
    },
  },
};
</script>
