<template>
  <Card class="lg:w-md">
    <template #content>
      <DataTable :value="tasks" class="taskslist">
        <template #header>
          <div>
            <span v-if="tasks">{{ 'Recent Tasks (' + tasks.length + ')' }}</span>
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

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, status: { name: 'Completed' } } : t);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
};

onMounted(() => {
  const savedTask = localStorage.getItem('tasks');

  if (savedTask) {
    const allTasks = JSON.parse(savedTask);
    tasks.value = allTasks.slice(-5).reverse();
  }
});

</script>