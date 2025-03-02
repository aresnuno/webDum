<template>
  <div class="min-h-screen flex flex-col bg-gray-100">
    <!-- Navbar -->
    <nav class="bg-blue-600 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold">My Blog</NuxtLink>
        <div>
          <NuxtLink to="/admin/articles/list" class="px-4">Article List</NuxtLink>
          <NuxtLink to="/admin/articles" class="px-4">Add Article</NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="container mx-auto p-4 flex-grow">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white text-center p-4 mt-4">
      © 2025 My Blog
    </footer>
  </div>
</template>

<script setup>
</script>

<style>
/* Global styles */
</style>
