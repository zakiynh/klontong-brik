<template>
  <div
    class="min-h-screen bg-gray-100 flex items-center justify-center px-4"
  >
    <div
      class="bg-white shadow-md rounded-lg w-full max-w-md p-6"
    >
      <h2
        class="text-2xl font-bold text-gray-800 mb-6 text-center"
      >
        Edit Produk
      </h2>

      <form
        @submit.prevent="handleSubmit"
        class="space-y-4"
      >
        <div>
          <label
            class="block text-sm font-medium text-gray-600 mb-1"
            >Nama Produk</label
          >
          <input
            v-model="form.name"
            type="text"
            placeholder="Contoh: Susu Ultra 1L"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-600 mb-1"
            >SKU</label
          >
          <input
            v-model="form.sku"
            type="text"
            placeholder="Kode SKU unik"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-600 mb-1"
            >Deskripsi</label
          >
          <textarea
            v-model="form.description"
            placeholder="Deskripsi lengkap produk"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
          ></textarea>
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-600 mb-1"
            >Harga</label
          >
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            placeholder="Contoh: 10000"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-600 mb-1"
            >URL Gambar</label
          >
          <input
            v-model="form.image"
            type="text"
            placeholder="https://..."
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            class="block text-sm font-medium text-gray-600 mb-1"
            >Kategori</label
          >
          <select
            v-model="form.categoryId"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">
              Pilih Kategori
            </option>
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.name }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <label
              class="block text-sm font-medium text-gray-600 mb-1"
              >Berat (gram)</label
            >
            <input
              v-model.number="form.weight"
              type="number"
              placeholder="Berat (gram)"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-600 mb-1"
              >Panjang (cm)</label
            >
            <input
              v-model.number="form.length"
              type="number"
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-600 mb-1"
              >Lebar (cm)</label
            >
            <input
              v-model.number="form.width"
              type="number"
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              class="block text-sm font-medium text-gray-600 mb-1"
              >Tinggi (cm)</label
            >
            <input
              v-model.number="form.height"
              type="number"
              min="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          💾 Simpan Perubahan
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "../helper/axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const router = useRouter();
const route = useRoute();
const toast = useToast();

const categories = ref([]);
const form = ref({
  name: "",
  sku: "",
  description: "",
  price: 0,
  image: "",
  categoryId: "",
  weight: 0,
  length: 0,
  width: 0,
  height: 0,
});

onMounted(async () => {
  const [catRes, productRes] = await Promise.all([
    axios.get("/categories"),
    axios.get(`/products/${route.params.id}`),
  ]);
  categories.value = catRes.data;
  Object.assign(form.value, productRes.data);
});

const handleSubmit = async () => {
  try {
    await axios.patch(
      `/products/${route.params.id}`,
      form.value
    );
    toast.success("Produk berhasil diperbarui");
    router.push(`/products/${route.params.id}`);
  } catch (err) {
    toast.error("Gagal update produk");
  }
};
</script>

<style scoped></style>
