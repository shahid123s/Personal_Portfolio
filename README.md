# Full-Stack Portfolio Architecture

A premium, highly-dynamic full-stack developer portfolio built with the **MERN** stack (MongoDB, Express, React, Node.js). The application features a stunning dark-mode frontend with seamless animations and a secure, fully-integrated Admin Dashboard to manage your profile, professional experience, and featured projects in real-time.

---

## 🌟 Key Features

### Frontend (Client)
- **Dynamic UI/UX:** Built with React, Vite, and Tailwind CSS.
- **Premium Aesthetics:** Dark-themed minimalist design with custom typography (`Noto Serif` and `Space Grotesk`).
- **Smooth Animations:** Powered by `framer-motion` for staggered scroll-reveal effects and dynamic navigation highlighting.
- **SEO Optimized:** Utilizes `react-helmet-async` for dynamic Meta tags and Open Graph data, accompanied by a static `sitemap.xml` and `robots.txt`.
- **Responsive:** Mobile-first design that scales perfectly to desktop environments.

### Backend (Server)
- **Robust API:** Node.js and Express RESTful architecture.
- **Database:** MongoDB with Mongoose object modeling.
- **Authentication:** JWT (JSON Web Tokens) and bcrypt for secure Admin panel access.
- **Cloud Media Storage:** Direct integration with Cloudinary via `multer-storage-cloudinary` for reliable and globally accessible image hosting.
- **Logging:** `morgan` integration for HTTP request monitoring.

---

## 📂 Repository Structure

The project is structured as a monorepo containing two distinct environments:

```
portfolio/
├── client/          # React + Vite frontend application
│   ├── public/      # Static assets, sitemap, robots.txt
│   ├── src/         # React components, pages, context, services
│   └── .env         # Frontend environment configuration
│
└── server/          # Node.js + Express backend application
    ├── src/         # API routes, models, middleware, server config
    ├── seed.js      # Database initialization script
    └── .env         # Backend environment configuration
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (Local instance or MongoDB Atlas)
- Cloudinary Account (for image uploads)

### 1. Backend Setup

Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and configure the following variables:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173

# Cloudinary Credentials (Required for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. Database Seeding

To quickly populate the database with default structures and the initial Admin account, run the seeder script:
```bash
npm run seed
```
> **Default Admin Credentials:**
> - **Email:** admin@portfolio.com
> - **Password:** Admin@123

### 3. Frontend Setup

In a new terminal window, navigate to the client directory and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5001/api
```

### 4. Run the Application

Start the backend server:
```bash
cd server
npm run dev
```

Start the frontend React app:
```bash
cd client
npm run dev
```

Visit `http://localhost:5173` to view the live portfolio.
Visit `http://localhost:5173/admin/login` to access the Admin Dashboard.

---

## 🛠 Tech Stack Details

- **Frontend:** React 18, React Router DOM, Tailwind CSS, Framer Motion, Axios, React Helmet Async, React Hot Toast.
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Multer, Cloudinary, Morgan.
- **Build Tool:** Vite.

---

## 📝 Deployment Notes

- **Frontend (e.g., Vercel / Netlify):** 
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Ensure you set `VITE_API_URL` to your production backend URL in the deployment environment variables.
  - The `vercel.json` file is already configured to handle React Router client-side routing.

- **Backend (e.g., Render / Railway):**
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Ensure you add all `server/.env` variables to your hosting provider's environment settings.
