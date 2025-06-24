import { defineStore } from "pinia";
import axios from "../helper/axios";
import { useToast } from 'vue-toastification'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: null as null | { email: string },
  }),

  actions: {
    async login(email: string, password: string) {
      const toast = useToast()
      try {
        const res = await axios.post(API_URL + "/auth/login", {
          email,
          password,
        });
        this.token = res.data.access_token;
        this.user = { email };
        localStorage.setItem("token", this.token);
        toast.success('Berhasil login!');
        return true;
      } catch (error) {
        toast.error('Gagal login. Cek email dan password.');
        return false;
      }
    },

    async register(email: string, password: string) {
      const toast = useToast()
      try {
        await axios.post(API_URL + "/auth/register", {
          email,
          password,
        });
        toast.success('Registrasi berhasil! Silakan login.');
        return await this.login(email, password);
      } catch (error) {
        toast.error('Gagal registrasi. Coba lagi.');
        return false;
      }
    },

    logout() {
      const toast = useToast()
      this.token = "";
      this.user = null;
      localStorage.removeItem("token");
      toast.info("Anda telah logout");
    }
  }
});
