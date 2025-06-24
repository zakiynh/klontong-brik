import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import AddProduct from '../pages/AddProduct.vue'
import EditProduct from '../pages/EditProduct.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/products/:id', component: ProductDetail },
  { path: '/products/:id/edit', component: EditProduct },
  { path: '/add-product', component: AddProduct },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
