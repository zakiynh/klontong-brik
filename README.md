# 🏪 Klontong App

Aplikasi toko klontong sederhana yang terdiri dari **Backend API (NestJS + PostgreSQL)** dan **Frontend SPA (Vue 3 + Pinia + TailwindCSS)**.

---

## 🔧 Tech Stack

### Backend
- ✅ [NestJS](https://nestjs.com/) (TypeScript)
- ✅ [Prisma ORM](https://www.prisma.io/)
- ✅ PostgreSQL
- ✅ JWT Authentication + Bcrypt
- ✅ Validation with `class-validator`

### Frontend
- ✅ [Vue 3](https://vuejs.org/)
- ✅ Pinia Store
- ✅ Vue Router
- ✅ Tailwind CSS
- ✅ Toast Notification: `vue-toastification`
- ✅ Form validation: `vee-validate` + `yup`

---

## 🗂️ Monorepo Structure

```
klontong-app/
│
├── klontong-backend/        # Backend (NestJS)
└── klontong-frontend/       # Frontend (Vue 3)
```

---

## ⚙️ Backend Setup

### 1. Install Dependencies
```bash
cd klontong-backend
npm install
```

### 2. Setup Environment
Buat file `.env` berdasarkan `.env.example`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/klontong"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

### 3. Migrasi & Seeding
```bash
npx prisma migrate reset
```

### 4. Start Server
```bash
npm run start:dev
```

### ✅ Akun Testing
```bash
Email: test@klontong.com
Password: test123
```

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint         | Keterangan      |
|--------|------------------|-----------------|
| POST   | `/auth/register` | Register user   |
| POST   | `/auth/login`    | Login user      |

### Product
| Method | Endpoint                         | Keterangan                    |
|--------|----------------------------------|-------------------------------|
| GET    | `/products`                      | Ambil semua produk (paging)  |
|        | `?page=1&search=xxx&categoryId=3`| Filter opsional              |
| GET    | `/products/:id`                  | Detail produk                 |
| POST   | `/products`                      | Tambah produk (auth)         |
| PATCH  | `/products/:id`                  | Edit produk (auth)           |
| DELETE | `/products/:id`                  | Hapus produk (auth)          |

### Category
| Method | Endpoint      | Keterangan           |
|--------|---------------|----------------------|
| GET    | `/categories` | Ambil semua kategori |

---

## 💻 Frontend Setup

### 1. Install Dependencies
```bash
cd klontong-frontend
npm install
```

### 2. Jalankan Frontend Dev Server
```bash
npm run dev
```

### 3. Konfigurasi Environment (Opsional)
Jika menggunakan `.env`, contoh isi:
```env
VITE_API_URL=http://localhost:3000
```

---
