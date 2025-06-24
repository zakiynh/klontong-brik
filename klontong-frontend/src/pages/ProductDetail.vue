<template>
  <div class="max-w-4xl mx-auto px-4 py-6">
    <!-- Skeleton Loading -->
    <div
      v-if="product.loading"
      class="bg-white rounded-lg shadow-md p-6 md:flex md:gap-6 animate-pulse"
    >
      <div
        class="w-full md:w-1/2 h-64 bg-gray-200 rounded-md"
      ></div>
      <div class="flex-1 mt-4 md:mt-0 space-y-4">
        <div
          class="h-6 bg-gray-200 rounded w-2/3"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded w-1/3"
        ></div>
        <div
          class="h-6 bg-gray-300 rounded w-1/2"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded w-full"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded w-full"
        ></div>
        <div
          class="h-4 bg-gray-200 rounded w-2/3"
        ></div>
        <div
          class="h-10 bg-gray-300 rounded w-32 mt-4"
        ></div>
      </div>
    </div>

    <!-- Product Content -->
    <div
      v-else-if="product.data"
      class="bg-white rounded-lg shadow-md p-6 md:flex md:gap-6"
    >
      <!-- Image -->
      <img
        :src="product.data.image"
        alt="Product Image"
        class="w-full md:w-1/2 h-64 object-contain bg-gray-100 rounded-md"
      />

      <!-- Details -->
      <div class="flex-1 mt-4 md:mt-0">
        <h1
          class="text-2xl font-bold text-gray-900"
        >
          {{ product.data.name }}
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          {{ product.data.categoryName }}
        </p>

        <p
          class="text-green-600 text-xl font-semibold mt-3"
        >
          Rp
          {{
            product.data.price.toLocaleString()
          }}
        </p>

        <p
          class="mt-4 text-gray-700 leading-relaxed"
        >
          {{ product.data.description }}
        </p>

        <div class="mt-4 text-sm text-gray-500">
          <div>
            <span
              class="font-medium text-gray-700"
              >Dimensi:</span
            >
            {{ product.data.length }} x
            {{ product.data.width }} x
            {{ product.data.height }} cm
          </div>
          <div>
            <span
              class="font-medium text-gray-700"
              >Berat:</span
            >
            {{ product.data.weight }} gram
          </div>
        </div>

        <router-link
          v-if="auth.token"
          :to="`/products/${product.data.id}/edit`"
          class="mt-6 inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          ✏️ Edit Produk
        </router-link>
      </div>
    </div>

    <div
      v-else
      class="text-center text-gray-400 mt-10"
    >
      Produk tidak ditemukan.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "../helper/axios";
import { useAuthStore } from "../stores/auth";

const route = useRoute();
const product = ref<{
  data: any;
  loading: boolean;
}>({
  data: null,
  loading: true,
});
const auth = useAuthStore();

onMounted(async () => {
  try {
    const res = await axios.get(
      `/products/${route.params.id}`
    );
    product.value.data = res.data;
  } catch (err) {
    console.error(err);
  } finally {
    product.value.loading = false;
  }
});
</script>
