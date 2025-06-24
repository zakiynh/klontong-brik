import { defineStore } from "pinia";
import axios from "../helper/axios";

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
    totalPages: 1,
    page: 1,
    search: '',
    categoryId: '',
    categories: [],
  }),

  actions: {
    async fetchCategories() {
      const res = await axios.get(import.meta.env.VITE_API_URL + '/categories');
      this.categories = res.data;
    },

    async fetchProducts() {
      const params: any = {
        page: this.page,
      }

      if (this.search) params.search = this.search;
      if (this.categoryId) params.categoryId = this.categoryId;

      const res = await axios.get(import.meta.env.VITE_API_URL + '/products', { params });

      this.products = res.data.data;
      this.totalPages = res.data.totalPages;
    },

    setSearch(val: string) {
      this.search = val;
      this.page = 1; // Reset to first page on search
      this.fetchProducts();
    },

    setCategory(id: string) {
      this.categoryId = id;
      this.page = 1; // Reset to first page on category change
      this.fetchProducts();
    },

    setPage(page: number) {
      this.page = page;
      this.fetchProducts();
    },
  }
})