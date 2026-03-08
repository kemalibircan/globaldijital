# GlobalDijital - Turn-Key Digital Solutions Platform

A comprehensive platform providing turn-key digital solutions (website, mobile app, SEO, ads) for small and medium-sized businesses.

## Features

- 🌐 **Website Development** - Modern, responsive websites built with Next.js
- 📱 **Mobile App Integration** - QR code-based ordering system
- 🔍 **SEO Optimization** - Built-in SEO best practices
- 📊 **Digital Marketing** - Google Ads, social media campaigns, performance tracking
- 💳 **Payment Integration** - Virtual POS and payment gateway
- 🌍 **Multilingual Support** - Turkish, English, Arabic, Spanish
- 🎨 **Modern UI** - Trustworthy blue, white, and black color scheme

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Payment**: Payment gateway integration

## Project Structure

```
globaldijital/
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend API
├── database/          # Database migrations and schema
└── docs/              # Documentation
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

1. Install all dependencies:
```bash
npm run install:all
```

2. Set up PostgreSQL database:
```bash
# Create database
createdb globaldijital

# Run migrations (see backend/README.md)
```

3. Configure environment variables:
- Copy `frontend/.env.example` to `frontend/.env.local`
- Copy `backend/.env.example` to `backend/.env`

4. Run development servers:
```bash
npm run dev
```

Frontend will run on http://localhost:3000
Backend API will run on http://localhost:5000

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/globaldijital
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PAYMENT_GATEWAY_KEY=your-payment-gateway-key
```

## Services Offered

1. **Website Package** - Custom website development
2. **SEO Package** - Search engine optimization
3. **Mobile App Package** - Mobile application development
4. **Digital Advertising** - Google Ads, social media campaigns

## Target Markets

- Turkey
- Europe
- Asia

## Languages Supported

- Turkish (tr) 🇹🇷
- German (de) 🇩🇪
- Arabic (ar) 🇸🇦 (with RTL support)

## License

Proprietary - All rights reserved

