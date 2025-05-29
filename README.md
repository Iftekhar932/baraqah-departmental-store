# 🛒 Baraqah Departmental Store

A full-stack e-commerce web app for a departmental store, featuring secure login, admin management, category-wise product browsing, cart system, invoice generation, and theme support.

---

## 🚀 Live Demo

[Click here to try the app](https://baraqah-departmental-store.netlify.app/) <!-- replace with real link -->

---

## 📸 Screenshots
![Home Page](./screenshots/home.png)
![Cart Page](./screenshots/cart.png)

## 👥 User Roles

- 👤 Regular Users:

  - Must log in to use the cart
  - Can select products and download invoice after confirming purchase

- 🔐 Admin:
  - Email: `admin@gmail.com`
  - Password: `!@#123Qq`
  - Can delete user accounts
  - Gets access to a new admin-only route, **visible only after login**

---

## 🔑 Demo Login Credentials

> 💡 Use **only dummy data** for demo accounts

- **Admin Login**  
  Email: `admin@gmail.com`  
  Password: `!@#123Qq`

---

## 🧩 Key Features

- 🔒 JWT-authenticated login system with email & Google sign-in
- 🛍️ Products viewable by category or all at once
- 🛒 Cart system usable **only after login**
- 📄 Invoice downloads automatically upon confirming purchase
- 🎨 Multiple theme options for a better UX
- 🧑‍💻 Admin route dynamically appears only to admin after login
- ❌ Admin can delete user accounts directly
- 🧪 Using **TypeScript** for gradual migration and learning

---

## 🛠️ Tech Stack

- Frontend: React.js, Tailwind CSS, DaisyUI, TypeScript (partial)
- Backend: Node.js, Express,
- Auth: Firebase (Google), Custom (Email), JWT
- Database: MongoDB, Mongoose

---

## 🚧 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/your-username/baraqah-departmental-store.git

# 2. Go into the folder
cd baraqah-departmental-store

# 3. Install dependencies
npm install

## 4. Run the development server
npm run dev
```
