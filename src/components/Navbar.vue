<template>
  <nav class="navbar w-full lg:w-[300px] lg:h-[90vh] text-text rounded-xl shadow-lg flex flex-col p-4">
    <div class="logo flex flex-col items-center justify-center py-10">
      <i class="pi pi-prime" style="font-size: 4rem;"></i>
      <h3 class="font-semibold text-2xl">Task Manager</h3>
    </div>
    <ul class="flex flex-col p-0 list-none">
      <li class="mb-5 text-2xl text-center p-4" :class="{ active: $route.path === '/' }">
        <router-link to="/" exact-active-class="active" class="flex flex-row items-center hover:underline">
          <i class="pi pi-book"></i>
          <span class="dashboard-item ml-4">Dashboard</span>
        </router-link>
      </li>

      <li class="mb-5 text-2xl text-center p-4" :class="{ active: $route.path === '/my-tasks' }">
        <router-link to="/my-tasks" exact-active-class="active" class="flex flex-row items-center hover:underline">
          <i class="pi pi-list"></i>
          <span class="dashboard-item ml-4">My Tasks</span>
        </router-link>
      </li>
    </ul>

  </nav>
</template>
