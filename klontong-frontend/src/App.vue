<template>
  <div class="p-4">
    <nav class="flex justify-between mb-4">
      <div>
        <router-link to="/" class="mr-4">Home</router-link>
      </div>
      <div>
        <router-link v-if="!auth.token" to="/login" class="mr-2">Login</router-link>
        <router-link v-if="!auth.token" to="/register">Register</router-link>
        <button v-if="auth.token" @click="handleLogout" class="ml-4 text-red-600">Logout</button>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/')
}
</script>
