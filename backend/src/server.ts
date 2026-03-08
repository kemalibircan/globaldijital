import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { pool } from './config/database';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import serviceRoutes from './routes/services';
import orderRoutes from './routes/orders';
import paymentRoutes from './routes/payments';
import contactRoutes from './routes/contact';
import qrRoutes from './routes/qr';
import chatRoutes from './routes/chat';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS: virgülle ayrılmış origin listesi (örn. http://localhost:3000,http://141.11.109.224:3000)
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (corsOrigins.includes(origin)) return callback(null, origin);
    callback(null, false);
  },
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected' });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/qr', qrRoutes);
app.use('/api/chat', chatRoutes);

// Error handling
app.use(errorHandler);

// Start server (0.0.0.0 = IP ile erişim için gerekli)
const HOST = process.env.HOST || '0.0.0.0';
app.listen(Number(PORT), HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS allowed origins: ${corsOrigins.join(', ')}`);
});

export default app;

