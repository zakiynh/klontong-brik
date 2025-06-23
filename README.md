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

## Dependency Installation
- **npm install**

## Environment Configuration
- **.env**: Change .env.example to .env
DATABASE_URL="postgresql://postgres:password@localhost:5432/klontong"
JWT_SECRET=
PORT=

BASE_URL=

## Seeding and Migration Data
- **npx prisma migrate reset**

## Starting server
**npm run start:dev**

## Testing Account
- **Email: test@klontong.com**
- **Password: test123**

## API Endpoints

- **Auth**

| Method | Endpoint         | Keterangan      |
| ------ | ---------------- | --------------- |
| POST   | `/auth/register` | Registrasi user |
| POST   | `/auth/login`    | Login user      |

- **Product**

| Method | Endpoint                          | Keterangan                      |
| ------ | --------------------------------- | ------------------------------- |
| GET    | `/products`                       | Ambil semua produk (pagination) |
|        | `?page=1&search=xxx&categoryId=3` | Filter opsional                 |
| GET    | `/products/:id`                   | Ambil detail produk             |
| POST   | `/products`                       | Tambah produk (auth)            |
| PATCH  | `/products/:id`                   | Edit produk (auth)              |
| DELETE | `/products/:id`                   | Hapus produk (auth)             |

- **Category**

| Method | Endpoint      | Keterangan           |
| ------ | ------------- | -------------------- |
| GET    | `/categories` | Ambil semua kategori |

