<template>
  <Card class="lg:w-md">
    <template #content>
      <DataTable :value="tasks" class="taskslist">
        <template #header>
          <div>
            <span v-if="tasks">{{ 'Urgent Tasks (' + tasks.length + ')' }}</span>
          </div>
        </template>
        <Column field="id"></Column>
        <Column field="title">
          <template #body="slotProps">
            <router-link :to="`/tasks/edit/${slotProps.data.id}`" class="text-blue-500 hover:underline">
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
import { ref, onMounted } from 'vue';


const tasks = ref(null);

const updateStatus = (task) => {
  if (task.status.name !== 'Completed') {
    task.status.name = 'Completed';

    // Update localStorage or backend if needed
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, status: { name: 'Completed' } } : t);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
};

onMounted(() => {
  const savedTask = localStorage.getItem('tasks');

  if (savedTask) {
    const allTasks = JSON.parse(savedTask);

    const incompleteTasks = allTasks.filter(task => task.status.name !== 'Completed');

    incompleteTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    tasks.value = incompleteTasks.slice(0, 5);
  }
});

</script>