<template>
  <tr v-for="(row, index) in props.rows" :key="index">
    <td v-for="(row, index) in props.columns" :key="index">
      <MISASkeletonLoader />
    </td>
  </tr>
</template>

<script setup>
import MISASkeletonLoader from "./MISASkeletonLoader.vue";

const props = defineProps({
  rows: {
    type: Number,
    default: 5,
  },
  columns: {
    type: Number,
    default: 2,
  },
});
</script>

<style scoped>
@import url("../table/table.css");
</style>
