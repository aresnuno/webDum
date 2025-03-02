<template>
    <div class="container mx-auto p-6 full-w">
      <!-- Back Button -->
      <NuxtLink to="/admin/articles/list" class="text-blue-500 hover:underline mb-4 inline-block">← Back to Articles</NuxtLink>
  
      <!-- Loading State -->
      <div v-if="pending" class="text-center text-gray-500">Loading article...</div>
  
      <!-- Error State -->
      <div v-if="error" class="text-red-500 text-center">
        Error loading article: {{ error.message }}
      </div>
  
      <!-- Article Content -->
      <div v-if="article" class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
        <h1 class="text-3xl font-bold mb-4">{{ article.title }}</h1>
        <p class="text-gray-500 text-sm">By Author {{ article.author_id }} | Published: {{ formatDate(article.created_at) }}</p>
  
        <img
          v-if="article.image_url"
          :src="article.image_url"
          alt="Article Image"
          class="w-full h-64 object-cover mt-4 rounded-lg"
        />
  
        <div class="mt-6 text-gray-800 text-lg leading-relaxed" v-html="article.content"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from "vue-router";
  import { computed } from "vue";
  
  const route = useRoute();
  const articleId = computed(() => route.params.id);
  const { data: article, pending, error } = useFetch(`http://localhost:8000/articles/${articleId.value}`);
  
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString();
  };
  </script>
  