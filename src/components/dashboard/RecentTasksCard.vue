<template>
  <Card class="lg:w-md">
    <template #content>
      <DataTable :value="recentTasks" class="taskslist">
        <template #header>
          <div>
            <span v-if="recentTasks" class="text-white">{{ 'Recent Tasks (' + recentTasks.length + ')' }}</span>
          </div>
        </template>
        <Column field="id" class="text-white"></Column>
        <Column field="title">
          <template #body="slotProps">
            <router-link :to="`/tasks/edit/${slotProps.data.id}`" class="task-title">
              {{ slotProps.data.title }}
            </router-link>
          </template>
        </Column>
        <Column>
          <template #body="slotProps">
            <i class="pi" :title="slotProps.data.status.name !== 'Completed' ? 'Click to complete' : ''" :class="{
              'pi-check-circle text-success': slotProps.data.status.name === 'Completed',
              'pi-calendar-times text-error cursor-pointer': slotProps.data.status.name === 'Upcoming',
              'pi-spinner text-progress cursor-pointer': slotProps.data.status.name === 'In Progress'
            }" @click="updateStatus(slotProps.data)">
            </i>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps(['tasks']);

const recentTasks = computed(() => {
  return props.tasks.slice(-5);
});

const updateStatus = (task) => {
  if (task.status.name !== 'Completed') {
    task.status.name = 'Completed';
    const updatedTasks = recentTasks.value.map(t => t.id === task.id ? { ...t, status: { name: 'Completed' } } : t);

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
};

</script>