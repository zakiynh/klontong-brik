<template>
  <div class="max-w-7xl mx-auto px-4 py-6">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Daftar Produk</h1>
      <router-link
        v-if="auth.token"
        to="/add-product"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-sm"
      >
        + Tambah Produk
      </router-link>
    </div>

    <!-- Search -->
    <input
      v-model="search"
      @input="handleSearch"
      placeholder="Cari produk..."
      class="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <!-- Kategori -->
    <select
      v-model="categoryId"
      @change="handleCategoryChange"
      class="w-full border border-gray-300 rounded px-4 py-2 mb-6 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Semua Kategori</option>
      <option v-for="cat in product.categories" :key="cat.id" :value="cat.id">
        {{ cat.name }}
      </option>
    </select>

    <!-- Grid Produk -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="p in product.products"
        :key="p.id"
        @click="goToDetail(p.id)"
        class="border border-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-blue-500 cursor-pointer p-4 bg-white relative"
      >
        <img :src="p.image" alt="image" class="h-36 w-full object-contain mb-3" />
        <h3 class="font-semibold text-gray-800 text-lg mb-1 truncate">{{ p.name }}</h3>
        <p class="text-sm text-gray-500 mb-1">{{ p.categoryName }}</p>
        <p class="text-green-600 font-semibold mb-2">Rp {{ p.price.toLocaleString() }}</p>

        <!-- Tombol edit & delete di pojok kanan bawah -->
        <div
          v-if="auth.token"
          class="absolute bottom-2 right-2 flex gap-2"
          @click.stop
        >
          <router-link
            :to="`/products/${p.id}/edit`"
            class="text-blue-500 hover:text-blue-700 transition"
            title="Edit Produk"
          >
            <i class="fas fa-pen-to-square"></i>
          </router-link>
          <button
            @click="confirmDelete(p.id)"
            class="text-red-500 hover:text-red-700 transition"
            title="Hapus Produk"
          >
            <i class="fas fa-trash-can"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex flex-wrap gap-2 justify-center">
      <button
        v-for="p in product.totalPages"
        :key="p"
        @click="product.setPage(p)"
        class="px-4 py-2 rounded border text-sm transition"
        :class="{
          'bg-blue-600 text-white': product.page === p,
          'bg-white text-gray-700 hover:bg-gray-100': product.page !== p
        }"
      >
        {{ p }}
      </button>
    </div>

    <!-- Modal Konfirmasi -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 class="text-lg font-semibold mb-4 text-gray-800">Hapus Produk?</h2>
        <p class="text-sm text-gray-600 mb-6">
          Apakah kamu yakin ingin menghapus produk ini? Tindakan ini tidak bisa dibatalkan.
        </p>
        <div class="flex justify-end gap-2">
          <button
            class="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
            @click="showConfirm = false"
          >
            Batal
          </button>
          <button
            class="px-4 py-2 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
            @click="handleDelete(productToDelete)"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductStore } from "../stores/product";
import { useAuthStore } from "../stores/auth";
import axios from "../helper/axios";
import { useToast } from "vue-toastification";

const product = useProductStore();
const auth = useAuthStore();
const search = ref("");
const categoryId = ref("");
const router = useRouter();
const toast = useToast();

const showConfirm = ref(false);
const productToDelete = ref<number | null>(null);

const confirmDelete = (id: number) => {
  productToDelete.value = id;
  showConfirm.value = true;
};

const handleDelete = async (id: number | null) => {
  if (!id) return;
  try {
    await axios.delete(`/products/${id}`);
    await product.fetchProducts();
    toast.success("Produk berhasil dihapus");
  } catch (error) {
    toast.error("Gagal menghapus produk");
  } finally {
    showConfirm.value = false;
  }
};

const goToDetail = (id: number) => {
  router.push(`/products/${id}`);
};

const handleSearch = () => {
  product.setSearch(search.value);
};

const handleCategoryChange = () => {
  product.setCategory(categoryId.value);
};

onMounted(async () => {
  await product.fetchCategories();
  await product.fetchProducts();
});
</script>
