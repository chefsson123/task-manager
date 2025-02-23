<template>
    <Card class="lg:w-md flex justify-center">
        <template #title>Tasks this month</template>
        <template #content>
            <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-[20rem] m-auto" />
        </template>
    </Card>
</template>

<script setup>
import { ref, onMounted } from "vue";

const tasks = ref([]);
const chartData = ref();
const chartOptions = ref(null);
const statusCounts = ref({
    Completed: 0,
    'In Progress': 0,
    Upcoming: 0,
});


onMounted(() => {
    const savedTask = localStorage.getItem('tasks');

    if (savedTask) {
        const allTasks = JSON.parse(savedTask);

        tasks.value = allTasks;

        statusCounts.value = allTasks.reduce(
            (acc, task) => {
                const status = task.status.name;
                if (acc[status] !== undefined) {
                    acc[status]++;
                }
                return acc;
            },
            { Completed: 0, 'In Progress': 0, Upcoming: 0 }
        );
    }
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['Completed', 'In progress', 'Upcoming'],
        datasets: [
            {
                data: [statusCounts.value.Completed, statusCounts.value["In Progress"], statusCounts.value.Upcoming],
                backgroundColor: [documentStyle.getPropertyValue('--p-emerald-500'), documentStyle.getPropertyValue('--p-orange-500'), documentStyle.getPropertyValue('--p-gray-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--p-cyan-400'), documentStyle.getPropertyValue('--p-orange-400'), documentStyle.getPropertyValue('--p-gray-400')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    cutout: '60%',
                    color: textColor
                }
            }
        }
    };
};
</script>