# Gradana App

Sebuah aplikasi fullstack yang terdiri dari backend dengan **NestJS** dan frontend dengan **React + Vite**.  
Aplikasi ini mendukung registrasi, login, dan dashboard sederhana yang menampilkan saldo dan riwayat top-up.

---

## Teknologi yang Digunakan

### Backend

- **NestJS** – Framework Node.js untuk membangun server terstruktur
- **Mongoose** – ODM untuk MongoDB
- **Winston** – Logger untuk memantau aktivitas dan error
- **Passport + JWT** – Autentikasi dan manajemen token

### Frontend

- **React + Vite** – Framework modern untuk SPA
- **Ant Design** – UI component library
- **Zustand** – State management
- **Axios** – HTTP client untuk komunikasi dengan backend
- **TanStack Query** – Fetching, caching, dan state server-side data

---

## Cara menjalankan

---

## Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/gradana-app.git
cd gradana-app

cd backend
npm install
npm run start:dev

cd ../frontend
npm install
npm run dev

```

ENV FIle:

#### Backend

```bash
MONGO_URI=<MongoDB Connection String>
JWT_SECRET=<Secret Key untuk JWT>
```

#### Frontend

```bash
API_URL=<localhost port backend>
```
