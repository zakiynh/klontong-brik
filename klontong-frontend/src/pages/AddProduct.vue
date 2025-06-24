<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4 text-gray-800 text-center">Tambah Produk</h2>

    <form @submit.prevent="onSubmit" class="space-y-3">
      <input
        v-model="name"
        type="text"
        placeholder="Nama Produk"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="sku"
        type="text"
        placeholder="SKU"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        v-model="description"
        placeholder="Deskripsi"
        rows="3"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <input
        v-model.number="price"
        type="number"
        placeholder="Harga"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        v-model="image"
        type="text"
        placeholder="URL Gambar"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <select
        v-model="categoryId"
        class="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Pilih Kategori</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>

      <div class="grid grid-cols-3 gap-2">
        <input
          v-model.number="weight"
          type="number"
          placeholder="Berat (gram)"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model.number="length"
          type="number"
          placeholder="Panjang (cm)"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model.number="width"
          type="number"
          placeholder="Lebar (cm)"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model.number="height"
          type="number"
          placeholder="Tinggi (cm)"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Simpan
      </button>
    </form>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "../helper/axios";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const toast = useToast();

const categories = ref([]);

onMounted(async () => {
  const res = await axios.get("/categories");
  categories.value = res.data;
});

// Skema validasi
const schema = yup.object({
  name: yup.string().required(),
  sku: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().min(1),
  categoryId: yup.string().required(),
  image: yup.string().url().required(),
  weight: yup.number().required(),
  length: yup.number().required(),
  width: yup.number().required(),
  height: yup.number().required(),
});

useForm({ validationSchema: schema });

// Binding semua field
const { value: name } = useField<string>("name");
const { value: sku } = useField<string>("sku");
const { value: description } = useField<string>(
  "description"
);
const { value: price } =
  useField<number>("price");
const { value: image } =
  useField<string>("image");
const { value: categoryId } =
  useField<string>("categoryId");
const { value: weight } =
  useField<number>("weight");
const { value: length } =
  useField<number>("length");
const { value: width } =
  useField<number>("width");
const { value: height } =
  useField<number>("height");

const onSubmit = async () => {
  try {
    await axios.post("/products", {
      name: name.value,
      sku: sku.value,
      description: description.value,
      price: price.value,
      image: image.value,
      categoryId: categoryId.value,
      weight: weight.value,
      length: length.value,
      width: width.value,
      height: height.value,
    });
    toast.success("Produk berhasil ditambahkan");
    router.push("/");
  } catch (err) {
    toast.error("Gagal tambah produk");
  }
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.btn {
  background-color: #1d4ed8;
  color: white;
  padding: 8px;
  border-radius: 4px;
  width: 100%;
}
</style>
