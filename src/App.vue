<template>
  <Layout>
    <Navbar />
    <main class="w-full">
      <router-view />
    </main>
  </Layout>
</template>

<script setup>
import Layout from './components/Layout.vue'
import Navbar from './components/Navbar.vue'

</script>
