# Nilan Infra Limited — Node.js & Express.js Backend API

RESTful backend service for **Nilan Infra Limited** construction management, administrative dashboard, leads CRM, and quotation estimation. Built using Node.js, Express.js, and MySQL.

---

## 🚀 Tech Stack & Libraries
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js 4.x
- **Database:** MySQL 8.0+ (using `mysql2/promise` connection pooling)
- **Security & Auth:** `jsonwebtoken` (JWT), `bcryptjs` password hashing, `helmet` security headers
- **CORS:** Configured for frontend (`http://localhost:5173`)
- **Logging:** `morgan`

---

## 📁 Directory Structure
```
backend/
├── config/
│   └── db.js                 # MySQL pool connection & auto-table migration
├── controllers/
│   ├── authController.js     # Admin login, token verify, profile & password
│   ├── projectController.js  # CRUD for infrastructure & construction projects
│   ├── inquiryController.js  # Leads & CRM inquiries
│   ├── quoteController.js    # Cost estimator & saved quotations
│   ├── blogController.js     # Construction articles & news
│   └── dashboardController.js# Aggregated metrics & analytics
├── middleware/
│   ├── auth.js               # JWT verification middleware
│   └── errorHandler.js       # Central error & 404 handler
├── routes/
│   ├── authRoutes.js         # /api/auth
│   ├── projectRoutes.js      # /api/projects
│   ├── inquiryRoutes.js      # /api/inquiries
│   ├── quoteRoutes.js        # /api/quotations
│   ├── blogRoutes.js         # /api/blogs
│   └── dashboardRoutes.js    # /api/dashboard
├── scripts/
│   ├── initDb.js             # Standalone DB initialization script
│   └── seedData.js           # Database seeder script
├── database.sql              # Raw SQL script for MySQL Workbench / CLI
├── server.js                 # Express server entry point
├── package.json              # Dependencies and start scripts
├── .env                      # Local environment configuration
└── .env.example              # Template environment file
```

---

## ⚙️ Configuration (`.env`)
Create or edit `backend/.env` with your MySQL credentials:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MySQL Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=nilan_infra_db

# JWT Secret
JWT_SECRET=nilan_infra_ultra_secure_jwt_secret_key_2026_coimbatore
JWT_EXPIRES_IN=7d

# Default Admin Credentials
ADMIN_EMAIL=nilan.infralimited@gmail.com
ADMIN_PASSWORD=Nilan@321
```

---

## 🛠️ Database Setup
The backend automatically executes `CREATE DATABASE IF NOT EXISTS nilan_infra_db` and builds all tables and seed records on first launch.

You can also initialize or inspect the database manually:
```bash
# Via npm script
npm run db:init

# Or directly in MySQL CLI / Workbench
mysql -u root -p < database.sql
```

---

## 🏃 Running the Server

### Development mode (with hot reloading)
```bash
cd backend
npm run dev
```

### Production mode
```bash
cd backend
npm start
```

---

## 📡 API Endpoints Reference

### 1. Healthcheck
- `GET /api/health` — Server and database connectivity status

### 2. Authentication (`/api/auth`)
- `POST /api/auth/login` — Authenticate admin (`nilan.infralimited@gmail.com` / `Nilan@321`), returns JWT token
- `GET /api/auth/me` *(Protected)* — Current admin profile details
- `POST /api/auth/change-password` *(Protected)* — Change master password

### 3. Projects (`/api/projects`)
- `GET /api/projects` — List projects (optional `?category=residential|commercial|civil|renovation`, `?status=`, `?search=`)
- `GET /api/projects/:id` — Single project details
- `POST /api/projects` *(Protected)* — Create a new construction project
- `PUT /api/projects/:id` *(Protected)* — Update project progress, budget, status, or details
- `DELETE /api/projects/:id` *(Protected)* — Remove project

### 4. Client Inquiries & Leads (`/api/inquiries`)
- `POST /api/inquiries` — Public submission from Contact & Quote forms
- `GET /api/inquiries` *(Protected)* — List CRM leads (optional `?status=New|In Progress|Contacted|Converted`, `?search=`)
- `GET /api/inquiries/:id` *(Protected)* — View inquiry details
- `PATCH /api/inquiries/:id/status` *(Protected)* — Update inquiry status
- `DELETE /api/inquiries/:id` *(Protected)* — Remove inquiry

### 5. Quotation Estimator (`/api/quotations`)
- `POST /api/quotations` — Record calculated construction estimate
- `GET /api/quotations` *(Protected)* — List generated quotations
- `GET /api/quotations/:id` *(Protected)* — Quotation details

### 6. Blog & News (`/api/blogs`)
- `GET /api/blogs` — Public published construction insights
- `GET /api/blogs/:identifier` — Article by ID or URL slug
- `POST /api/blogs` *(Protected)* — Publish new article
- `PUT /api/blogs/:id` *(Protected)* — Edit article
- `DELETE /api/blogs/:id` *(Protected)* — Remove article

### 7. Executive Dashboard (`/api/dashboard`)
- `GET /api/dashboard/stats` *(Protected)* — Real-time aggregated KPIs (active projects, pending leads, contract portfolio value, compliance score)
