# Quick Start Guide

Get GlobalDijital up and running in 5 minutes!

## Prerequisites Check

- [ ] Node.js 18+ installed (`node --version`)
- [ ] PostgreSQL 14+ installed and running
- [ ] npm or yarn installed

## Quick Setup

### 1. Install Dependencies (2 minutes)

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..

# Install backend dependencies
cd backend && npm install && cd ..
```

### 2. Database Setup (1 minute)

```bash
# Create database
createdb globaldijital

# Run schema
psql -d globaldijital -f database/schema.sql
```

### 3. Configure Environment (1 minute)

**Backend** - Create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/globaldijital
JWT_SECRET=change-this-secret-key
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

**Frontend** - Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Start Servers (1 minute)

```bash
# Start both servers
npm run dev
```

Or separately:
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

## Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Test Login

**Admin Account:**
- Email: `admin@globaldijital.com`
- Password: `admin123`

**Or create a new account:**
1. Go to http://localhost:3000/register
2. Fill in the form
3. Login and access dashboard

## Next Steps

1. ✅ Browse services at `/services`
2. ✅ Create an order
3. ✅ Test payment flow
4. ✅ Generate QR codes
5. ✅ Explore admin features (if logged in as admin)

## Troubleshooting

**Database connection error?**
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `backend/.env`
- Ensure database exists: `psql -l | grep globaldijital`

**Port already in use?**
- Change PORT in `backend/.env`
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local`

**Module not found?**
- Delete `node_modules` folders
- Run `npm install` again

## Need Help?

- Check `SETUP.md` for detailed instructions
- Review `README.md` for project overview
- See `PROJECT_STRUCTURE.md` for architecture details

Happy coding! 🚀

