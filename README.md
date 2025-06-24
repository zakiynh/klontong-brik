
# 🏪 Klontong API

Backend service untuk aplikasi toko klontong sederhana. Dibangun menggunakan **NestJS**, **Prisma**, dan **PostgreSQL**. Menyediakan fitur autentikasi, manajemen produk, dan kategori.

---

## 🚀 Tech Stack

- **Backend**: [NestJS](https://nestjs.com/) (TypeScript)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Database**: PostgreSQL
- **Auth**: JWT + Bcrypt
- **Validation**: class-validator
- **Seeding**: JSON data (produk & kategori)

---

## 🧩 Dependency Installation

```bash
npm install
```

---

## ⚙️ Environment Configuration

1. Duplikat file `.env.example` menjadi `.env`
2. Sesuaikan variabel:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/klontong"
JWT_SECRET=your_jwt_secret
PORT=3000
BASE_URL=http://localhost:3000
```

---

## 🌱 Seeding & Migration

```bash
npx prisma migrate reset
```

Ini akan:
- Menghapus database lama
- Migrasi ulang semua tabel
- Menjalankan seeding otomatis (produk & kategori)

---

## ▶️ Menjalankan Server

```bash
npm run start:dev
```

---

## 🧪 Akun Testing

```txt
Email:    test@klontong.com
Password: test123
```

---

## 🔌 API Endpoints

### ✅ Auth

| Method | Endpoint         | Deskripsi        |
|--------|------------------|------------------|
| POST   | `/auth/register` | Register user    |
| POST   | `/auth/login`    | Login user       |

---

### 📦 Produk

| Method | Endpoint                          | Deskripsi                       |
|--------|-----------------------------------|----------------------------------|
| GET    | `/products`                       | Ambil semua produk (pagination) |
|        | `?page=1&search=xxx&categoryId=3` | (Optional) filter query         |
| GET    | `/products/:id`                   | Detail produk berdasarkan ID    |
| POST   | `/products`                       | Tambah produk (auth required)   |
| PATCH  | `/products/:id`                   | Edit produk (auth required)     |
| DELETE | `/products/:id`                   | Hapus produk (auth required)    |

---

### 🗂️ Kategori

| Method | Endpoint      | Deskripsi           |
|--------|---------------|---------------------|
| GET    | `/categories` | Ambil semua kategori |

---

## 📌 Catatan
- Gunakan tool seperti [Postman](https://www.postman.com/) atau [Insomnia](https://insomnia.rest/) untuk mengetes API.
- Semua endpoint `POST`, `PATCH`, dan `DELETE` membutuhkan JWT token.

---

Happy coding! 💪
