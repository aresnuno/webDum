<template>
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6 text-center">Articles</h1>
  
      <!-- Loading State -->
      <div v-if="pending" class="text-center text-gray-500">Loading articles...</div>
  
      <!-- Error State -->
      <div v-if="error" class="text-red-500 text-center">
        Error loading articles: {{ error.message }}
      </div>
  
      <!-- Articles Grid -->
      <div v-if="articles.length" class="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        <div v-for="article in articles" :key="article.id" class="bg-white shadow-lg rounded-lg  max-h-200 overflow-hidden">
          <div class="p-4">
            <h2 class="text-xl font-semibold">{{ article.title }}</h2>
            <!-- <div v-html="article.content" class=" text-gray-600 text-sm mt-2 line-clamp-2 "></div> -->
            <NuxtLink :to="`/admin/articles/${article.id}`" class="mt-4 block text-blue-500 hover:underline">
              Read More →
            </NuxtLink>
          </div>
        </div>
      </div>
  
      <!-- No Articles Found -->
      <div v-else-if="!pending" class="text-center text-gray-500">
        No articles found.
      </div>
    </div>
  </template>
  
  <script setup>
  const { data: articles, pending, error } = useFetch("http://localhost:8000/articles/");
  </script>
  
  <style>
  /* Ensure text truncation */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>
  