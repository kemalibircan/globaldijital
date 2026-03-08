# GlobalDijital Frontend

Next.js 14 frontend application for the GlobalDijital platform.

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 🌍 Multilingual support (Turkish, English, Arabic, Spanish)
- 📱 Responsive design
- 🔐 Authentication integration
- 💳 Payment integration
- 📊 Dashboard for users
- 🎯 SEO optimized

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Forms**: React Hook Form (ready for integration)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Project Structure

```
frontend/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Home page
│   ├── services/     # Services page
│   ├── contact/      # Contact page
│   ├── login/        # Login page
│   ├── register/     # Registration page
│   └── dashboard/    # User dashboard
├── lib/              # Utility functions
│   └── api.ts        # API client
├── components/       # Reusable components (to be added)
└── public/           # Static assets
```

## Pages

- `/` - Homepage
- `/services` - Service packages
- `/contact` - Contact form
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User dashboard (authenticated)

## Color Scheme

- **Primary Blue**: `#2563eb` (trustworthy-blue)
- **White**: `#ffffff`
- **Black**: `#000000`

## Multilingual Support

Currently set up for:
- Turkish (tr) - Default
- English (en)
- Arabic (ar)
- Spanish (es)

Translation files can be added in `public/locales/` directory.

## API Integration

The frontend communicates with the backend API through:
- `lib/api.ts` - Axios instance with authentication
- Environment variable `NEXT_PUBLIC_API_URL`

## Authentication

- JWT tokens stored in localStorage
- Automatic token injection in API requests
- Redirect to login on 401 errors

## Future Enhancements

- [ ] Complete i18n implementation with translation files
- [ ] Admin dashboard
- [ ] Order management UI
- [ ] QR code display and scanning
- [ ] Payment form integration
- [ ] Service customization interface
- [ ] SEO metadata for all pages
- [ ] Analytics integration

