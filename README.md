# Full-Stack Portfolio — www.shahidnoushad.com

A premium, full-stack developer portfolio built on the **MERN** stack (MongoDB, Express, React, Node.js). The application features a stunning dark-mode frontend with scroll-driven animations and a secure Admin Dashboard for real-time content management.

---

## 🌟 Key Features

### Frontend (Client)
- **Dynamic UI/UX:** Built with React 18, Vite, and Tailwind CSS.
- **Premium Aesthetics:** Dark-themed minimalist design with custom typography (`Noto Serif` and `Space Grotesk`).
- **Smooth Animations:** Powered by `framer-motion` for staggered scroll-reveal effects and dynamic navigation dot indicator.
- **SEO Optimized:** `react-helmet-async` for dynamic title, meta description, and Open Graph tags — all driven by the live database profile.
- **Static SEO Files:** `sitemap.xml` and `robots.txt` served from the public directory, pointing to `www.shahidnoushad.com`.
- **Cloudinary Images:** All portfolio images are served directly from Cloudinary CDN URLs — no local file dependency.
- **Environment Aware:** API base URL configured via `.env` (`VITE_API_URL`) for seamless dev/production switching.
- **Responsive:** Mobile-first design that scales perfectly to desktop.

### Backend (Server)
- **Modular Architecture:** Feature-based, Domain-Driven structure. Every feature (`auth`, `profile`, `project`, `experience`) is fully self-contained with its own `model`, `service`, `controller`, and `routes`.
- **Centralized Error Handling:** A global `error.middleware.js` combined with a `catchAsync` utility eliminates repetitive `try/catch` blocks across all controllers.
- **JWT Authentication:** Secure Admin access via signed JSON Web Tokens with a 7-day expiry.
- **Cloudinary Uploads:** Images are streamed directly from `multer` to Cloudinary — zero local disk storage required.
- **HTTP Request Logging:** `morgan` provides structured `dev`-format request logs in the terminal for easy debugging.
- **Health Endpoint:** `/api/health` returns a real-time snapshot of server status, database connectivity, process uptime, and memory usage. Returns `503` if the database is disconnected.

---

## 📂 Repository Structure

```
portfolio/
├── client/                       # React + Vite frontend
│   ├── public/
│   │   ├── sitemap.xml           # SEO sitemap
│   │   └── robots.txt            # Search engine crawler rules
│   ├── src/
│   │   ├── components/portfolio/ # Hero, Navbar, Projects, Experience, Contact, Footer
│   │   ├── pages/
│   │   │   ├── Portfolio.jsx     # Public-facing portfolio page with Helmet SEO
│   │   │   └── admin/            # Login, Dashboard, ProfileAdmin, ProjectsAdmin, ExperienceAdmin
│   │   ├── context/AuthContext   # JWT Auth state management
│   │   ├── services/api.js       # Axios instance (reads VITE_API_URL from .env)
│   │   └── index.css             # Global styles + smooth scroll
│   ├── vercel.json               # React Router SPA rewrite rules for Vercel
│   └── .env                      # Frontend environment variables
│
└── server/                       # Node.js + Express backend
    └── src/
        ├── config/
        │   ├── db.js             # MongoDB connection
        │   └── cloudinary.js     # Cloudinary SDK configuration
        ├── middlewares/
        │   ├── auth.middleware.js    # JWT validation guard
        │   ├── error.middleware.js   # Global error handler
        │   └── upload.middleware.js  # Multer + Cloudinary storage factory
        ├── modules/              # Feature modules (Domain-Driven Design)
        │   ├── admin/admin.model.js
        │   ├── auth/             # auth.routes, auth.controller, auth.service
        │   ├── profile/          # profile.model, routes, controller, service
        │   ├── experience/       # experience.model, routes, controller, service
        │   └── project/          # project.model, routes, controller, service
        ├── utils/
        │   ├── AppError.js       # Custom operational error class
        │   └── catchAsync.js     # Async try/catch wrapper for controllers
        ├── app.js                # Express app setup (middleware + routes)
        ├── server.js             # Entry point (DB connect + listen)
        └── seed.js               # Database initialization script
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local instance or MongoDB Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key

CLIENT_URL=http://localhost:5173

# Cloudinary (required for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Seed the Database

Populates the database with a default Admin account, sample profile, experience, and projects:
```bash
npm run seed
```
> **Default Admin Credentials:**
> - **Email:** `admin@portfolio.com`
> - **Password:** `Admin@123`

### 4. Frontend Setup

```bash
cd client
npm install
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

### 5. Run the Application

Start the backend (Terminal 1):
```bash
cd server && npm run dev
```

Start the frontend (Terminal 2):
```bash
cd client && npm run dev
```

| URL | Description |
|---|---|
| `http://localhost:5173` | Public portfolio |
| `http://localhost:5173/admin/login` | Admin Dashboard |
| `http://localhost:5001/api/health` | Server health check |

---

## 🩺 Health Endpoint

`GET /api/health` returns a real-time JSON snapshot of the server's health:

```json
{
  "status": "OK",
  "message": "Portfolio API is running 🚀",
  "database": "Connected",
  "uptime": 3600.42,
  "memoryUsage": {
    "rss": 52428800,
    "heapTotal": 20971520,
    "heapUsed": 15728640,
    "external": 1048576
  },
  "timestamp": "2026-04-28T04:30:00.000Z"
}
```

> Returns `200 OK` when healthy and `503 Service Unavailable` if the database is disconnected.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Routing | React Router DOM v6 |
| SEO | React Helmet Async |
| HTTP Client | Axios |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| File Uploads | Multer, multer-storage-cloudinary |
| Media CDN | Cloudinary |
| Logging | Morgan |

---

## 📝 Deployment

### Frontend (Vercel / Netlify)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variable:** Set `VITE_API_URL` to your production backend URL.
- The `client/vercel.json` is pre-configured to handle React Router's client-side routing.

### Backend (Render / Railway)
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- Add all variables from `server/.env` into your hosting provider's environment settings.
- Run `npm run seed` once after the first deployment to initialize the admin account.

---

## 🔐 Admin Access

Visit `https://www.shahidnoushad.com/admin/login` to access the Admin Dashboard. Use the credentials from the seed step to log in and manage your profile, experience, and projects live.
