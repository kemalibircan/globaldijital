# Database Setup Guide

## Prerequisites

- PostgreSQL 14 or higher
- Database user with CREATE privileges

## Setup Instructions

1. **Create Database:**
```bash
createdb globaldijital
```

Or using psql:
```sql
CREATE DATABASE globaldijital;
```

2. **Run Schema:**
```bash
psql -d globaldijital -f schema.sql
```

Or using psql:
```sql
\i schema.sql
```

3. **Configure Connection:**
Update the `DATABASE_URL` in `backend/.env`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/globaldijital
```

## Database Structure

### Tables

- **users** - User accounts (customers and admins)
- **services** - Available service packages
- **orders** - Customer orders
- **order_items** - Individual items in orders
- **payments** - Payment transactions
- **qr_codes** - QR codes for mobile ordering
- **contact_submissions** - Contact form submissions
- **seo_data** - SEO tracking data
- **marketing_campaigns** - Digital marketing campaigns

### Default Data

- Admin user: `admin@globaldijital.com` / `admin123` (CHANGE IN PRODUCTION!)
- Sample services are automatically inserted

## Security Notes

⚠️ **IMPORTANT**: Change the default admin password before deploying to production!

To update admin password:
```sql
-- Generate new password hash using bcrypt
UPDATE users 
SET password_hash = '$2a$10$NEW_HASH_HERE' 
WHERE email = 'admin@globaldijital.com';
```

## Backup

To backup the database:
```bash
pg_dump globaldijital > backup.sql
```

To restore:
```bash
psql -d globaldijital < backup.sql
```

