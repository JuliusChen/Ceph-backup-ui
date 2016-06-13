<template>
  <div>
    <h3>Task List</h3>
  </div>
  <table width="300" border="1">
    <tr>
      <td>No</td>
      <td>type</td>
      <td>task name</td>
      <td>progress</td>
      <td>detail</td>
    </tr>
    <tr v-for="task in tasklists">
      <td>{{task.no}}</td>
      <td>{{task.type}}</td>
      <td>{{task.id}}</td>
      <td>{{task.progress}}</td>
      <td>detail</td>
    </tr>
  </table>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>

<script>
export default {
  data() {
    return {
      tasklists: [
        {
          id: '2016-05-25-xxxx-1',
          no: 1,
          type: 'pool',
          progress: '10%',
          uuid: 'ebdc7aaf-2652-4128-bfd1-0a5d6d0acc6f',
        },
        {
          id: '2016-05-25-xxxx-2',
          no: 2,
          type: 'pool',
          progress: '87%',
          uuid: 'd153b5ba-649b-481e-ae61-7ae5e792ae02',
        },
      ],
    };
  },
};
</script>


