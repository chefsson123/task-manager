<template>
  <div class="flex flex-col lg:flex-row justify-evenly">
    <RecentTasksCard :tasks="tasks"/>
    <UrgentTasksCard :tasks="tasks"/>
    <MonthlyProgressCard :tasks="tasks" />
  </div>
  <div class="flex flex-row text-center justify-evenly lg:mt-12">
    <TasksByDateCard />
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import RecentTasksCard from '../components/dashboard/RecentTasksCard.vue';
import TasksByDateCard from '../components/dashboard/TasksByDateCard.vue';
import UrgentTasksCard from '../components/dashboard/UrgentTasksCard.vue';
import MonthlyProgressCard from '../components/dashboard/MonthlyProgressCard.vue';

const tasks = ref([]);

onMounted(() => {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks);
  }
});

</script>