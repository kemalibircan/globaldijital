# GlobalDijital Project Structure

## Overview

This is a full-stack turn-key digital solutions platform with separate frontend and backend applications.

## Directory Structure

```
globaldijital/
├── frontend/                 # Next.js frontend application
│   ├── app/                  # Next.js App Router
│   │   ├── page.tsx          # Homepage
│   │   ├── services/         # Services page
│   │   ├── contact/          # Contact page
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── dashboard/        # User dashboard
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   └── providers.tsx     # Context providers
│   ├── lib/                  # Utility functions
│   │   └── api.ts            # API client
│   ├── public/               # Static assets
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/                   # Express.js backend API
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   │   └── database.ts   # PostgreSQL connection
│   │   ├── middleware/       # Express middleware
│   │   │   ├── auth.ts       # Authentication middleware
│   │   │   └── errorHandler.ts # Error handling
│   │   ├── routes/           # API routes
│   │   │   ├── auth.ts       # Authentication routes
│   │   │   ├── users.ts      # User management
│   │   │   ├── services.ts   # Service packages
│   │   │   ├── orders.ts     # Order management
│   │   │   ├── payments.ts   # Payment processing
│   │   │   ├── contact.ts    # Contact form
│   │   │   └── qr.ts         # QR code generation
│   │   └── server.ts         # Express server setup
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── database/                  # Database files
│   ├── schema.sql            # PostgreSQL schema
│   └── README.md             # Database documentation
│
├── package.json              # Root package.json (workspace)
├── README.md                 # Main project README
├── SETUP.md                  # Setup instructions
└── .gitignore                # Git ignore rules
```

## Key Features by Component

### Frontend (Next.js)

**Pages:**
- Homepage with service overview
- Services listing with packages
- Contact form
- User authentication (login/register)
- User dashboard with orders

**Features:**
- Responsive design with Tailwind CSS
- JWT-based authentication
- API integration with Axios
- Multilingual support setup (Turkish, English, Arabic, Spanish)
- Trustworthy blue, white, and black color scheme

### Backend (Express.js)

**API Endpoints:**
- `/api/auth` - Authentication (register, login, me)
- `/api/users` - User management
- `/api/services` - Service packages CRUD
- `/api/orders` - Order management
- `/api/payments` - Payment processing
- `/api/contact` - Contact form submissions
- `/api/qr` - QR code generation and scanning

**Features:**
- JWT authentication
- Role-based access control (Admin/Customer)
- PostgreSQL database integration
- Input validation with express-validator
- Error handling middleware
- QR code generation for mobile ordering

### Database (PostgreSQL)

**Tables:**
- `users` - User accounts
- `services` - Service packages
- `orders` - Customer orders
- `order_items` - Order line items
- `payments` - Payment transactions
- `qr_codes` - QR codes for orders
- `contact_submissions` - Contact form data
- `seo_data` - SEO tracking
- `marketing_campaigns` - Marketing campaigns

## Technology Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL (pg)
- JWT (jsonwebtoken)
- bcryptjs
- QRCode

### Database
- PostgreSQL 14+

## Development Workflow

1. **Start Database**: Ensure PostgreSQL is running
2. **Run Migrations**: Execute `database/schema.sql`
3. **Start Backend**: `cd backend && npm run dev`
4. **Start Frontend**: `cd frontend && npm run dev`
5. **Access**: Frontend at http://localhost:3000, Backend at http://localhost:5000

## Production Deployment

1. Build both applications
2. Configure environment variables
3. Set up PostgreSQL on Windows server
4. Run migrations
5. Start services (consider using PM2 or Windows Service)

## Security Considerations

- JWT tokens for authentication
- Password hashing with bcrypt
- Input validation on all endpoints
- Role-based access control
- CORS configuration
- Environment variables for secrets

## Future Enhancements

- Complete admin dashboard UI
- Full i18n translation files
- Real payment gateway integration
- Email notifications
- File upload for service assets
- Analytics dashboard
- SEO tools interface
- Marketing campaign management UI

