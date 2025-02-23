import { createRouter, createWebHistory } from 'vue-router';
import TaskList from '../views/TaskList.vue'
import Dashboard from '../views/Dashboard.vue';
import EditTask from '@/views/EditTask.vue';
import CreateTask from '../views/CreateTask.vue';


const routes = [
    { path: '/', name: 'Dashboard', component: Dashboard },
    { path: '/my-tasks', name: 'TaskList', component: TaskList },
    { path: '/tasks/edit/:id', name: 'EditTask', component: EditTask, props: true },
    { path: '/tasks/create/:id', name: 'CreateTask', component: CreateTask, props: true },

  ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
