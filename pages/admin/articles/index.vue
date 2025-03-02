<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Write an Article</h1>

    <input v-model="title" class="border p-2 w-full mb-4" placeholder="Title" />

    <!-- Quill Editor -->
    <ClientOnly>
      <QuillEditor
        v-model:content="content"
        contentType="html"
        theme="snow"
        :options="editorOptions"
        ref="quillEditor"
      />
    </ClientOnly>

    <button
      @click="saveArticle"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      :disabled="loading"
    >
      {{ loading ? "Saving..." : "Save Article" }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "highlight.js/styles/monokai-sublime.css"; // Syntax theme
import hljs from "highlight.js";
import "@vueup/vue-quill/dist/vue-quill.snow.css"; // Quill styles

const title = ref("");
const content = ref("<p>Start writing...</p>");
const loading = ref(false);
const quillEditor = ref(null);

const editorOptions = {
  modules: {
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value, // Enable auto-highlight
    },
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["image", "code-block"], // ✅ Enable images + code block
      ["code-block"], // Enable code block button
    ],
  },
};

const saveArticle = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert("Title and content cannot be empty!");
    return;
  }

  loading.value = true;

  try {
    const response = await fetch("http://localhost:8000/articles/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        content: content.value,
        author_id: 1, // Change this dynamically if needed
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to save article");
    }

    const result = await response.json();
    alert("Article saved successfully!");
    console.log("Saved article:", result);
  } catch (error) {
    console.error("Error saving article:", error);
    alert("Error saving article!");
  } finally {
    loading.value = false;
  }
};


const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result.url; // ✅ Return uploaded image URL
  } catch (error) {
    console.error("Image upload failed:", error);
  }
};

const handlePaste = async (event) => {
  const clipboardData = event.clipboardData || window.clipboardData;
  if (!clipboardData) return;

  for (const item of clipboardData.items) {
    if (item.kind === "file" && item.type.startsWith("image/")) {
      event.preventDefault(); // ✅ Stop default base64 behavior
      const file = item.getAsFile();
      const imageUrl = await uploadImage(file);

      const editor = quillEditor.value.getQuill();
      const range = editor.getSelection();
      console.log("Image URL:", imageUrl);
      editor.insertEmbed(range.index, "image", imageUrl); // ✅ Insert uploaded image
    }
  }
};
onMounted(async () => {
  await nextTick(); // ✅ Ensure Quill is ready
  const editor = quillEditor.value?.getQuill(); // ✅ Prevent null error
  if (editor) {
    editor.root.addEventListener("paste", handlePaste);
  }
});
</script>

<style>
/* Ensure code blocks have a background */
.ql-syntax {
  background: #272822 !important;
  color: #f8f8f2 !important;
  padding: 10px;
  border-radius: 5px;
}
</style>
