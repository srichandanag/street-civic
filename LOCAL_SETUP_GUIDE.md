# Street Civic - Setup & Local Development Guide

## 🎯 What You Have

A **production-ready**, **full-stack civic issue reporting platform** with:

- ✅ **React 18 + TypeScript** - Modern frontend with Material-UI
- ✅ **Node.js + Express + TypeScript** - Type-safe backend
- ✅ **MongoDB** - NoSQL database with geospatial indexing
- ✅ **Interactive Heatmap** - Leaflet.js visualization with color coding
- ✅ **Issue Management** - CRUD operations for reporting civic issues
- ✅ **Real-time Updates** - Frontend refreshes every 30 seconds
- ✅ **Professional UI** - Responsive design with Material-Design components
- ✅ **Production Structure** - Monorepo pattern with clear separation

---

## 📋 Prerequisites

Install these before running locally:

- **Node.js v16+** - https://nodejs.org
- **MongoDB** - Local (`mongod`) or Atlas cloud: https://mongodb.com/cloud/atlas
- **Git** - https://git-scm.com

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

```bash
cd street-civic
npm run install-all
```

This installs dependencies for:
- Root project
- Frontend (React + Vite)
- Backend (Express + TypeScript)

### 2. Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/street-civic
```

### 3. Configure Backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` if using cloud MongoDB:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/street-civic
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 4. Run Development Servers

From project root:
```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173 (React Vite dev server)
- **Backend**: http://localhost:5000 (Node.js Express server)

---

## 💻 Usage (Local)

1. **Open http://localhost:5173** in browser
2. **Report Issue**:
   - Click "Report Issue" button
   - Fill form with location (📍 click button to use GPS)
   - Select category & severity
   - Submit
3. **View Heatmap**:
   - Map shows colored circles:
     - 🟢 Green = Low severity
     - 🟡 Orange = Medium severity
     - 🔴 Red = High severity
4. **Sort Issues**:
   - Recent issues listed on right panel
   - Auto-refreshes every 30 seconds

---

## 🏗️ Project Structure

```
street-civic/
├── frontend/                    (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx       (App header with nav)
│   │   │   ├── Heatmap.tsx      (Leaflet map with markers)
│   │   │   ├── IssueCard.tsx    (Issue display card)
│   │   │   └── IssueReportDialog.tsx (Issue submission form)
│   │   ├── pages/
│   │   ├── services/
│   │   │   └── issueService.ts  (API client)
│   │   ├── types/
│   │   │   └── Issue.ts         (TypeScript types)
│   │   ├── App.tsx              (Main app component)
│   │   └── main.tsx             (Entry point)
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/                     (Node.js + Express + TypeScript)
│   ├── src/
│   │   ├── models/
│   │   │   └── Issue.ts         (MongoDB schema)
│   │   ├── controllers/
│   │   │   └── issueController.ts (Business logic)
│   │   ├── routes/
│   │   │   └── issues.ts        (API routes)
│   │   └── server.ts            (Express app & server)
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── README.md                    (Project documentation)
├── package.json                 (Root monorepo config)
└── .gitignore
```

---

## 📡 API Endpoints

### Issues
- `GET /api/issues` - Get all issues
  - Query: `?category=pothole&severity=high`
- `POST /api/issues` - Create issue
  - Body: `{ title, description, category, severity, location }`
- `GET /api/issues/:id` - Get issue details
- `PUT /api/issues/:id` - Update issue
- `DELETE /api/issues/:id` - Delete issue
- `POST /api/issues/:id/upvote` - Upvote issue
- `GET /api/issues/heatmap/data` - Get heatmap coordinates

### Meta
- `GET /api/categories` - Available issue categories
- `GET /api/stats` - Platform statistics
- `GET /health` - Health check

---

## 🛠️ Development Commands

**Frontend Only**
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

**Backend Only**
```bash
cd backend
npm run dev      # Start with ts-node-dev (auto-reload)
npm run build    # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
```

---

## 🚀 Deployment

### Frontend (Vercel - Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

Set environment variable in Vercel:
```
VITE_API_URL=https://your-backend.com/api
```

### Backend (Railway or Heroku)

**Railway**
1. https://railway.app - Connect GitHub
2. Select `street-civic` repo
3. Add MongoDB service
4. Deploy

**Heroku**
```bash
# Install Heroku CLI
npm i -g heroku

# Login
heroku login

# Create app
heroku create street-civic

# Add MongoDB
heroku addons:create mongolab

# Push
git push heroku main
```

---

## 🎨 Customization

### Change Default Location
In `frontend/src/components/Heatmap.tsx`:
```typescript
<MapContainer
  center={[40.7128, -74.0060]} // Change to your city
  zoom={13}
  ...
/>
```

### Add Categories
Edit `backend/src/models/Issue.ts` and `backend/src/routes/issues.ts`

### Styling
- Material-UI components use `sx` prop for styling
- Global styles in `frontend/src/index.css`
- MUI theme can be added to App.tsx

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB - run `mongod` in another terminal

### Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution**: 
- Change PORT in `backend/.env`
- Or kill process: `lsof -i :5000` then `kill -9 <PID>`

### Frontend Can't Reach Backend
**Solution**: Check CORS_ORIGIN in `backend/.env` matches frontend URL

### React Warnings
- Suppress with `// eslint-disable-next-line` if necessary
- Usually just development warnings

---

## 📊 For Your Resume

Highlight these features:
1. **Full-Stack Development** - Frontend & Backend
2. **TypeScript** - Type-safe code
3. **MongoDB Geospatial** - Location-based queries
4. **Interactive Visualization** - Real-time heatmap
5. **Material-UI** - Professional UI components
6. **Express.js** - RESTful API design
7. **React Hooks** - Modern React patterns
8. **Responsive Design** - Mobile-friendly

---

## 📖 Next Steps

- [ ] Test locally (`npm run dev`)
- [ ] Push to GitHub (see GITHUB_PUSH_GUIDE.md)
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Railway/Heroku
- [ ] Add your project to resume
- [ ] Create demo video

---

## 📞 Support

Need help? Check:
- React Docs: https://react.dev
- Express.js: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Material-UI: https://mui.com
- Leaflet.js: https://leafletjs.com

---

**You've got this! 🎉 It's a production-ready application that looks amazing on GitHub and your resume.**
