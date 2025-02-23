<template>
  <div class="w-full flex justify-center">
    <DataTable v-model:selection="selectedTask" :value="tasks" class="w-sm lg:w-7xl" dataKey="id">
      <template #header>
        <div class="flex flex-wrap justify-between">
          <span class="text-xl font-bold">All Tasks</span>
          <div>
            <Button class="w-30" @click="addTask(tasks && tasks.length > 0 ? tasks.length : 0)">Add</Button>
            <Button class="w-30 ml-2" @click="deleteSelectedTasks()" severity="danger">Delete</Button>
          </div>
        </div>
      </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="id" header="Task Id" sortable></Column>

      <Column field="title" header="Title" sortable></Column>
      <Column header="Due Date" dataType="date" field="dueDate" sortable>
        <template #body="{ data }">
          {{ formatDate(data.dueDate) }}
        </template>
      </Column>
      <Column header="Status" field="status.name" sortable>
        <template #body="slotProps">
          <Tag :value="slotProps.data.status.name" :severity="getSeverity(slotProps.data)" />
        </template>
      </Column>
      <Column class="w-24 " header="Actions">
        <template #body="{ data }">
          <Button icon="pi pi-search" @click="editTask(data.id)" severity="secondary" rounded></Button>
        </template>
      </Column>
      <template #footer> In total there are {{ tasks ? tasks.length : 0 }} tasks. </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tasks = ref(null);
const selectedTask = ref();

onMounted(() => {
  const savedTask = localStorage.getItem('tasks');

  if (savedTask) {
    tasks.value = JSON.parse(savedTask);
  }
});


const getSeverity = (product) => {

  switch (product.status.value) {
    case 'done':
      return 'success';
    case 'progress':
      return 'warn';
    case 'upcoming':
      return 'danger';
    default:
      return null;
  }
};


const deleteSelectedTasks = () => {
  tasks.value = tasks.value.filter(task => !selectedTask.value.includes(task));
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
  selectedTask.value = []; // Clear selection
};

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const editTask = (id) => {
  router.push({ name: 'EditTask', params: { id } });
}
const addTask = (id) => {
  router.push({ name: 'CreateTask', params: { id } });
}
</script>