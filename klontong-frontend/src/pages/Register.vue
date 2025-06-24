<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-md rounded-lg w-full max-w-sm p-6">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Buat Akun</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 pr-10"
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
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          🚀 Register
        </button>
      </form>

      <p class="mt-4 text-sm text-center text-gray-500">
        Sudah punya akun?
        <router-link to="/login" class="text-emerald-600 hover:underline font-medium">
          Masuk di sini
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const email = ref('')
const password = ref('')
const showPassword = ref(false)

const router = useRouter()
const auth = useAuthStore()
const toast = useToast()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleRegister = async () => {
  const success = await auth.register(email.value, password.value)
  if (success) {
    toast.success('Registrasi berhasil!')
    router.push('/')
  } else {
    toast.error('Registrasi gagal. Coba lagi ya!')
  }
}
</script>
