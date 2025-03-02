<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Articles</h1>
      <div v-for="article in articles" :key="article.id" class="p-4 border mb-2">
        <h2 class="text-xl font-semibold">{{ article.title }}</h2>
        <div v-html="renderContent(article.content)"></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  const articles = ref([]);
  
  onMounted(async () => {
    const response = await fetch("http://localhost:8000/articles/");
    articles.value = await response.json();
  });
  
  const renderContent = (content) => {
    return content ? JSON.stringify(content, null, 2) : "No content available";
  };
  </script>
  