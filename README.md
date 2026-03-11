# Laxman Kale Portfolio (Full Stack)

Production-ready personal portfolio with separate admin dashboard, MongoDB Atlas integration, JWT auth, secure API layer, and media uploads.

## Stack
- Frontend: React + Vite + CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas + Mongoose
- Auth: JWT (admin only)
- Uploads: Multer

## Project Structure

```text
.
|-- backend
|   |-- scripts
|   |   `-- seed.js
|   |-- src
|   |   |-- config
|   |   |   |-- db.js
|   |   |   `-- env.js
|   |   |-- controllers
|   |   |   |-- adminAuthController.js
|   |   |   |-- adminController.js
|   |   |   `-- publicController.js
|   |   |-- middleware
|   |   |   |-- auth.js
|   |   |   |-- errorHandler.js
|   |   |   |-- rateLimit.js
|   |   |   |-- sanitize.js
|   |   |   |-- upload.js
|   |   |   `-- validateRequest.js
|   |   |-- models
|   |   |   |-- About.js
|   |   |   |-- AdminAccount.js
|   |   |   |-- Contact.js
|   |   |   |-- Message.js
|   |   |   |-- Project.js
|   |   |   |-- Skill.js
|   |   |   |-- SocialLink.js
|   |   |   `-- UserProfile.js
|   |   |-- routes
|   |   |   |-- adminAuthRoutes.js
|   |   |   |-- adminRoutes.js
|   |   |   `-- publicRoutes.js
|   |   |-- utils
|   |   |   |-- bootstrapAdmin.js
|   |   |   |-- password.js
|   |   |   |-- token.js
|   |   |   `-- uploadUrl.js
|   |   |-- app.js
|   |   `-- server.js
|   |-- uploads
|   |-- .env.example
|   `-- package.json
|-- frontend
|   |-- src
|   |   |-- api
|   |   |   |-- adminApi.js
|   |   |   |-- client.js
|   |   |   `-- publicApi.js
|   |   |-- components
|   |   |   |-- admin
|   |   |   |   |-- AdminLogin.jsx
|   |   |   |   `-- AdminSidebar.jsx
|   |   |   `-- public
|   |   |       |-- AboutSection.jsx
|   |   |       |-- ContactSection.jsx
|   |   |       |-- FooterSection.jsx
|   |   |       |-- HeroSection.jsx
|   |   |       |-- Navbar.jsx
|   |   |       |-- ProjectsSection.jsx
|   |   |       `-- SkillsSection.jsx
|   |   |-- context
|   |   |   `-- ThemeContext.jsx
|   |   |-- pages
|   |   |   |-- AdminPage.jsx
|   |   |   `-- PortfolioPage.jsx
|   |   |-- styles
|   |   |   |-- admin.css
|   |   |   |-- global.css
|   |   |   `-- portfolio.css
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- .env.example
|   `-- package.json
`-- README.md
```

## Core Features Implemented
- Public portfolio sections: Home, About, Skills, Projects, Contact
- Sticky navbar + smooth scroll links (Resume removed from menu)
- Hero buttons: Download CV + View Projects
- Skills by categories with icon fallback support
- Compact project cards with GitHub and Live links (no View Details)
- Contact form with strict 10-digit phone
- Footer with contact + social icons only
- Light/dark mode + responsive layout + smooth reveal animations
- Text selection/copy disabled on content (inputs/textarea exempt)
- Admin dashboard route: `/LK` only (hidden from public navigation)
- Admin auth with username + password + 6-digit secret code
- Password visibility toggles for login/account forms
- Session persisted in `sessionStorage` (tab close => auto logout)
- Admin sidebar order exactly as requested
- Admin CRUD: Hero, About, Skills, Projects, Contact, Messages, Social links, Account
- Backend hardening: Helmet, CORS allowlist, write/login rate limiters, JWT middleware, input validation/sanitization
- Seed script for default data

## Database Collections
- `user_profile`
- `about`
- `skills`
- `projects`
- `contact`
- `social_links`
- `messages`
- `admin_account`

## Environment Setup

### Backend `.env`
Copy `backend/.env.example` to `backend/.env` and set:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<atlas mongodb+srv url>
JWT_SECRET=<long random string>
JWT_EXPIRES_IN=7d
ADMIN_USERNAME=Laxmankale
ADMIN_PASSWORD=Samarth@07
ADMIN_SECRET_CODE=050707
FRONTEND_URL=https://<netlify-site>.netlify.app,http://localhost:5173
MAX_FILE_SIZE_MB=5
```

### Frontend `.env`
Copy `frontend/.env.example` to `frontend/.env` and set:

```env
VITE_API_URL=https://<render-backend>.onrender.com/api
```

## Local Run

### 1) Backend
```bash
cd backend
npm install
npm run seed
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend default: `http://localhost:5173`
Backend default: `http://localhost:5000`

## API Summary

### Public
- `GET /api/health`
- `GET /api/portfolio`
- `POST /api/messages`

### Admin Auth
- `POST /api/admin/auth/login`
- `GET /api/admin/auth/me`
- `PUT /api/admin/auth/account`

### Admin Protected
- `GET /api/admin/overview`
- `GET/PUT /api/admin/hero`
- `GET/PUT /api/admin/about`
- `GET/POST /api/admin/skills`
- `PUT/DELETE /api/admin/skills/:id`
- `GET/POST /api/admin/projects`
- `PUT/DELETE /api/admin/projects/:id`
- `GET/PUT /api/admin/contact`
- `GET /api/admin/messages`
- `DELETE /api/admin/messages/:id`
- `GET/PUT /api/admin/social-links`

## Deployment

### MongoDB Atlas
1. Create Atlas cluster and DB user.
2. Add IP access (`0.0.0.0/0` or restricted Render egress).
3. Copy `mongodb+srv://...` URI into Render backend `MONGODB_URI`.

### Backend on Render
1. Create a new **Web Service** from repo folder `backend`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Set env vars from backend `.env`.
5. Ensure `FRONTEND_URL` includes your Netlify domain.

### Frontend on Netlify
1. Create site from repo folder `frontend`.
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set env: `VITE_API_URL=https://<render-backend>.onrender.com/api`
5. Deploy.

### Final Cross-Check
1. Open Netlify URL and confirm public portfolio loads from API.
2. Open `/LK` and login with admin credentials.
3. Update Hero/About/Skills/Projects and confirm changes reflect on public site.
4. Submit contact form and verify message appears in Admin `Message`.

## Security Notes
- Strong password policy enforced server-side.
- Secret code validated as exactly 6 digits.
- JWT required for all admin content endpoints.
- Login/API write routes rate limited.
- CORS restricted to `FRONTEND_URL` allowlist.
- Helmet enabled for secure HTTP headers.
- Express-validator + sanitization middleware applied.

