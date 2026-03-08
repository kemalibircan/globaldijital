# GlobalDijital Backend API

Express.js backend API for the GlobalDijital platform.

## Features

- RESTful API with Express.js and TypeScript
- JWT-based authentication
- PostgreSQL database integration
- Payment processing
- QR code generation for mobile ordering
- Role-based access control (Admin/Customer)
- Input validation with express-validator
- Error handling middleware

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (authenticated)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)

### Orders
- `GET /api/orders` - Get orders (user's own or all if admin)
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status (admin only)

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/history` - Get payment history
- `GET /api/payments/:id` - Get payment by ID

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all submissions (admin only)

### QR Codes
- `POST /api/qr/generate` - Generate QR code for order
- `POST /api/qr/scan` - Scan QR code (mobile app)
- `GET /api/qr/my-codes` - Get user's QR codes

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/globaldijital
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PAYMENT_GATEWAY_KEY=your-payment-gateway-key
PAYMENT_GATEWAY_SECRET=your-payment-gateway-secret
CORS_ORIGIN=http://localhost:3000
```

## Installation

```bash
cd backend
npm install
```

## Development

```bash
npm run dev
```

Server will run on http://localhost:5000

## Build

```bash
npm run build
npm start
```

## Database Migrations

Run the database schema:
```bash
psql -d globaldijital -f ../database/schema.sql
```

## Testing API

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Services (with token)
```bash
curl -X GET http://localhost:5000/api/services \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Security Notes

- Always use HTTPS in production
- Change JWT_SECRET to a strong random string
- Use environment variables for sensitive data
- Implement rate limiting for production
- Add input sanitization for production use

