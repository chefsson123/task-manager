<template>
  <Card class="lg:w-md">
    <template #content>
      <DataTable :value="urgentTasks" class="taskslist">
        <template #header>
          <div>
            <span v-if="urgentTasks">{{ 'Urgent Tasks (' + urgentTasks.length + ')' }}</span>
          </div>
        </template>
        <Column field="id"></Column>
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
import { computed, defineProps } from 'vue';
const props = defineProps(['tasks']);

const recentTasks = computed(() => {
  return props.tasks.slice(-5);
});

const urgentTasks = computed(() => {
  const incompleteTasks = recentTasks.value.filter(task => task.status.name !== 'Completed');

    incompleteTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    return incompleteTasks;
});

const updateStatus = (task) => {
  if (task.status.name !== 'Completed') {
    task.status.name = 'Completed';
    const updatedTasks = recentTasks.value.map(t => t.id === task.id ? { ...t, status: { name: 'Completed' } } : t);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
};


</script>