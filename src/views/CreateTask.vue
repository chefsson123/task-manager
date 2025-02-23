<template>
    <div class="flex flex-col lg:flex-row justify-evenly">
        <div class="card flex flex-col">
            <div class="flex flex-col">
                <label for="title">Title</label>
                <InputText id="title" type="text" v-model="title" class="w-screen  lg:w-2xl" />
            </div>
            <div class="flex flex-col mt-8">
                <label for="description">Description</label>
                <Textarea id="description" v-model="description" rows="5" cols="30" class="w-screen lg:w-2xl" />
            </div>
            <div class="flex flex-col mt-8">
                <label for="status">Status</label>
                <Select v-model="selectedStatus" :options="statuses" optionLabel="name" placeholder="Select status"
                    class="w-screen lg:w-56" />

            </div>
            <div class="flex flex-col mt-8">
                <label for="dueDate">Due Date</label>
                <DatePicker id="dueDate" v-model="date" inline showWeek dateFormat="dd/mm/yy" :minDate="today"
                    class="w-screen lg:w-2xl" />
            </div>

        </div>
        <Card class="h-20 w-80">
            <template #content>
                <div class="flex flex-row justify-evenly text-center">
                    <Button class="w-30" :disabled="!title || !description || !selectedStatus || !date"
                        @click="createTask()">Create</Button>
                    <Button class="w-30" severity="danger">Cancel</Button>
                </div>
            </template>
        </Card>
    </div>
</template>


<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const title = ref('');
const description = ref('');
const selectedStatus = ref('');
const statuses = ref([
    { name: 'Upcoming', value: 'upcoming' },
    { name: 'In Progress', value: 'progress' },
    { name: 'Completed', value: 'done' },
]);
const date = ref(null)
const today = ref(new Date());
const router = useRouter();


const createTask = () => {
    const newTask = {
        id: taskId,
        title: title.value,
        description: description.value,
        status: selectedStatus.value,
        dueDate: date.value,
    };

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    existingTasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(existingTasks));

    router.push({ name: 'TaskList' });

}

const route = useRoute();
const taskId = route.params.id;
</script>