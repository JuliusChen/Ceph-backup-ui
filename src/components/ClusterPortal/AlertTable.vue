<template>
  <h5>Recent Alerts</h5>
  <table class="bordered">
    <thead>
      <tr>
        <th data-field="">Job ID</th>
        <th data-field="">Reason</th>
        <th data-field="">Time</th>
        <th data-field="">Severity</th>
      </tr>
      <tr v-for="alert in alerts">
        <td>{{ alert.job_id }}</td>
        <td>{{ alert.reason }}</td>
        <td>{{ alert.time }}</td>
        <td>{{ alert.severity }}</td>
      </tr>
    </thead>
  </table>
</template>

<script>
export default {
  data: () => ({
    alerts: [
      {
        job_id: 'backup-12345678',
        reason: 'backup failed.',
        time: '2016-06-14-11-11-11',
        severity: 'error',
      },
      {
        job_id: 'backup-12345679',
        reason: 'albert failed',
        time: '2016-06-14-11-23-45',
        severity: 'critical',
      },
      {
        job_id: 'restore-12345678',
        reason: 'restore failed.',
        time: '2016-06-14-11-59-59',
        severity: 'error',
      },
    ],
  }),
};
</script>
