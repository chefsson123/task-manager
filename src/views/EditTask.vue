<template>
    <div class="flex flex-col lg:flex-row justify-evenly">
        <div class="card flex flex-col">
            <div class="flex flex-col">
                <label for="title">Title</label>
                <InputText id="title" type="text" v-model="taskData.title" class="w-screen lg:w-2xl" />
            </div>
            <div class="flex flex-col mt-8">
                <label for="description">Description</label>
                <Textarea id="description" v-model="taskData.description" rows="5" cols="30"
                    class="w-screen lg:w-2xl" />
            </div>
            <div class="flex flex-col mt-8">
                <label for="status">Status</label>
                <Select v-model="taskData.status" :options="statuses" optionLabel="name" placeholder="Select status"
                    class="w-full md:w-56" />

            </div>
            <div class="flex flex-col mt-8">
                <label for="dueDate">Due Date</label>
                <DatePicker id="dueDate" v-model="taskData.dueDate" inline showWeek dateFormat="dd/mm/yy"
                    :minDate="today" class="w-screen lg:w-2xl" />
            </div>
        </div>
        <Card class="h-20 w-screen lg:w-80 ">
            <template #content class="flex flex-row justify-evenly text-center">
                <div class="flex flex-row justify-evenly text-center">
                    <Button class="w-30" @click="saveTask()">Save</Button>
                    <Button class="w-30" @click="cancel()" severity="danger">Cancel</Button>
                </div>

            </template>
        </Card>
    </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const today = ref(new Date());
const tasks = ref();
const route = useRoute();
const router = useRouter();
const taskId = route.params.id;
const taskData = ref({
    title: '',
    description: '',
    status: {
        name: '',
        value: null
    },
    dueDate: null
});

onMounted(() => {
    const savedTask = JSON.parse(localStorage.getItem('tasks'));
    tasks.value = savedTask
    if (savedTask && savedTask[taskId]) {
        const task = savedTask[taskId];
        taskData.value = {
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate ? new Date(task.dueDate) : null,
        };
    }
});


const statuses = ref([
    { name: 'Upcoming', value: 'upcoming' },
    { name: 'In Progress', value: 'progress' },
    { name: 'Completed', value: 'done' },
]);

const saveTask = () => {
  tasks.value[taskId] = {
    id: taskId,
    title: taskData.value.title,
    description: taskData.value.description,
    status: taskData.value.status,
    dueDate: taskData.value.dueDate,
  };

  localStorage.setItem('tasks', JSON.stringify(tasks.value));

  router.push('/my-tasks');
};

const cancel = () => {
    router.push('/my-tasks')
}

</script>