# GlobalDijital Setup Guide

Complete setup instructions for the GlobalDijital platform.

## Prerequisites

- **Node.js** 18.0.0 or higher
- **PostgreSQL** 14.0 or higher
- **npm** or **yarn** package manager
- **Windows** (for local server deployment)

## Step 1: Install Dependencies

### Root Level
```bash
npm install
```

### Frontend
```bash
cd frontend
npm install
cd ..
```

### Backend
```bash
cd backend
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install:all
```

## Step 2: Database Setup

### 2.1 Create PostgreSQL Database

Open PostgreSQL command line or pgAdmin:

```sql
CREATE DATABASE globaldijital;
```

Or using command line:
```bash
createdb globaldijital
```

### 2.2 Run Database Schema

```bash
psql -d globaldijital -f database/schema.sql
```

Or using psql:
```sql
\c globaldijital
\i database/schema.sql
```

### 2.3 Verify Database

Check that tables were created:
```sql
\dt
```

You should see tables: users, services, orders, payments, etc.

## Step 3: Configure Environment Variables

### Backend Configuration

Create `backend/.env` file:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://username:password@localhost:5432/globaldijital
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PAYMENT_GATEWAY_KEY=your-payment-gateway-key
PAYMENT_GATEWAY_SECRET=your-payment-gateway-secret
CORS_ORIGIN=http://localhost:3000
```

**Important:** Replace:
- `username` and `password` with your PostgreSQL credentials
- `JWT_SECRET` with a strong random string
- Payment gateway keys with your actual keys

### Frontend Configuration

Create `frontend/.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 4: Start Development Servers

### Option 1: Run Both Servers Together
```bash
npm run dev
```

### Option 2: Run Separately

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## Step 6: Default Credentials

### Admin Account
- **Email**: admin@globaldijital.com
- **Password**: admin123

⚠️ **SECURITY WARNING**: Change the admin password immediately in production!

To change admin password:
1. Register a new admin account, OR
2. Update directly in database:
```sql
-- Generate new hash using bcrypt
UPDATE users 
SET password_hash = '$2a$10$NEW_HASH_HERE' 
WHERE email = 'admin@globaldijital.com';
```

## Step 7: Production Deployment (Windows Server)

### 7.1 Build Applications

```bash
# Build frontend
cd frontend
npm run build
cd ..

# Build backend
cd backend
npm run build
cd ..
```

### 7.2 Configure Production Environment

Update `backend/.env`:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/globaldijital
JWT_SECRET=STRONG_RANDOM_SECRET_HERE
CORS_ORIGIN=https://yourdomain.com
```

### 7.3 Start Production Servers

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm start
```

### 7.4 Windows Service (Optional)

Use tools like `pm2-windows-service` or `node-windows` to run as Windows service:

```bash
npm install -g pm2-windows-service
pm2 start backend/dist/server.js --name globaldijital-backend
pm2 save
pm2 startup
```

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists
- Verify user permissions

### Port Already in Use
- Change PORT in backend/.env
- Update NEXT_PUBLIC_API_URL in frontend/.env.local

### Module Not Found Errors
- Run `npm install` in each directory
- Delete node_modules and reinstall
- Check Node.js version (18+)

### Build Errors
- Clear .next folder: `rm -rf frontend/.next`
- Clear dist folder: `rm -rf backend/dist`
- Rebuild from scratch

## Next Steps

1. **Customize Services**: Update service packages in database
2. **Configure Payment Gateway**: Add real payment gateway credentials
3. **Set Up Email**: Configure email service for notifications
4. **SEO Setup**: Configure analytics and tracking
5. **Security Hardening**: 
   - Change default passwords
   - Use strong JWT secrets
   - Enable HTTPS
   - Set up firewall rules

## Support

For issues or questions:
- Check the README.md files in frontend/ and backend/
- Review database/README.md for database setup
- Check server logs for error messages

