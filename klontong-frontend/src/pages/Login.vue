<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-md rounded-lg w-full max-w-sm p-6">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Masuk ke Akun</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Password</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
              tabindex="-1"
            >
              <EyeIcon v-if="!showPassword" class="w-5 h-5" />
              <EyeSlashIcon v-else class="w-5 h-5" />
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          🔐 Login
        </button>
      </form>

      <p class="mt-4 text-sm text-center text-gray-500">
        Belum punya akun?
        <router-link to="/register" class="text-blue-600 hover:underline font-medium">
          Daftar di sini
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  const success = await auth.login(email.value, password.value)
  if (success) {
    toast.success('Login berhasil!')
    router.push('/')
  } else {
    toast.error('Login gagal. Cek email & password kamu.')
  }
}
</script>
