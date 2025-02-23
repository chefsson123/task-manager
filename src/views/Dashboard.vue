<template>
  <div class="flex flex-col lg:flex-row justify-evenly">
    <RecentTasksCard />
    <UrgentTasksCard />
    <MonthlyProgressCard />
  </div>
  <div class="flex flex-row text-center justify-evenly lg:mt-12">
    <TasksByDateCard />
  </div>

</template>

<script setup>
import RecentTasksCard from '../components/dashboard/RecentTasksCard.vue';
import TasksByDateCard from '../components/dashboard/TasksByDateCard.vue';
import UrgentTasksCard from '../components/dashboard/UrgentTasksCard.vue';
import MonthlyProgressCard from '../components/dashboard/MonthlyProgressCard.vue';
</script>