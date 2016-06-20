<template>
  <window>
  <div class="message-box" v-show="isShow">
    <div v-if="isShow" class="">
      <table>
        <thead>
          <tr>
            <th>
              Info
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UUID</td>
            <td>{{ task.uuid }}</td>
          </tr>
          <tr>
            <td>Created at</td>
            <td>{{task.created_at}}</td>
          </tr>
          <tr>
            <td>Type</td>
            <td>{{task.backup_type}}</td>
          </tr>
          <tr>
            <td>Scheduled</td>
            <td>{{task.is_scheduled}}</td>
          </tr>
          <tr>
            <td>Progressing</td>
            <td>{{task.progressing}}</td>
          </tr>
          <tr>
            <td>Rate</td>
            <td>{{task.rate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</window>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    task: {
      type: Object,
    },
  },
};
</script>

<style>
  .message-box {
    position: absolute;
    top: 0px;
    right: 0px;
    background: #FFF;

    border-style: solid;
    border-width: 1px;
    border-color: black;
  }
</style>
