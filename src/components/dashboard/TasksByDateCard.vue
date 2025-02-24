<template>
    <div class="flex flex-col lg:flex-row">
        <Card class="w-screen lg:w-md lg:mr-5">
            <template #content>
                <DatePicker id="dueDate" v-model="date" inline showWeek dateFormat="dd/mm/yy" :minDate=today
                    class="lg:w-2xl" />
            </template>
        </Card>
        <Card class="w-screen lg:w-md">
            <template #content>
                <DataTable :value="filteredTasks" class="taskslist">
                    <template #header>
                        <span v-if="filteredTasks.length > 0" class="text-white">{{ 'Tasks By Date (' + filteredTasks.length + ')'
                            }}</span>
                        <span v-else class="text-white">Select a date to view tasks for that day</span>
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
                            <i class="pi" :title="slotProps.data.status.name !== 'Completed' ? 'Click to complete' : ''"
                                :class="{
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
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const date = ref(new Date());
const today = ref(new Date());
const tasks = ref(null);
const filteredTasks = ref([]);

const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

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
        tasks.value = JSON.parse(savedTask);
    }
});

watch(date, (newDate) => {
    filterTasksByDate(newDate);
});

const filterTasksByDate = (selectedDate) => {
    const formattedSelectedDate = formatDate(selectedDate);
    filteredTasks.value = tasks.value.filter(task => {
        const formattedTaskDate = formatDate(task.dueDate);
        return formattedTaskDate === formattedSelectedDate;
    });
};

</script>