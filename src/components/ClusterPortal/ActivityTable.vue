<template>
  <h5>Recent Activity</h5>
  <table class="bordered">
    <thead>
      <tr>
        <th data-field="">ID</th>
        <th data-field="">Substance</th>
        <th data-field="">Status</th>
        <th data-field="">Time</th>
      </tr>
      <tr v-for="activity in activities">
        <td>{{ activity.id }}</td>
        <td>{{ activity.substance }}</td>
        <td>{{ activity.status }}</td>
        <td>{{ activity.time }}</td>
      </tr>
    </thead>
  </table>
</template>

<script>
export default {
  data: () => ({
    activities: [
      {
        id: '48frw646',
        substance: 'Set up the backup plan.',
        status: 'Success',
        time: '2016-06-14-11-11-11',
      },
      {
        id: '8d1f3adf',
        substance: 'Create a backup of image \'image-1\' from \'pool-1\'.',
        status: 'Success',
        time: '2016-06-14-11-23-45',
      },
      {
        id: 'fv8br2n',
        substance: 'Delete Vincent\'s favorite vedio.',
        status: 'Failed',
        time: '2016-06-14-23-44-44',
      },
    ],
  }),
};
</script>
