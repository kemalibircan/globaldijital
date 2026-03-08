import express from 'express';
import QRCode from 'qrcode';
import { pool } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Generate QR code for order
router.post('/generate', authenticate, async (req: AuthRequest, res) => {
  try {
    const { order_id } = req.body;

    // Verify order belongs to user
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [order_id, req.user!.id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orderResult.rows[0];
    const qr_data = {
      order_id: order.id,
      user_id: order.user_id,
      total_amount: order.total_amount,
      timestamp: new Date().toISOString(),
    };

    // Generate QR code
    const qr_code = await QRCode.toDataURL(JSON.stringify(qr_data));

    // Store QR code in database
    const qr_id = uuidv4();
    await pool.query(
      `INSERT INTO qr_codes (id, order_id, user_id, qr_data, qr_image)
       VALUES ($1, $2, $3, $4, $5)`,
      [qr_id, order.id, order.user_id, JSON.stringify(qr_data), qr_code]
    );

    res.json({
      qr_id,
      qr_code,
      qr_data,
    });
  } catch (error: any) {
    console.error('Generate QR code error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Scan QR code (for mobile app)
router.post('/scan', async (req, res) => {
  try {
    const { qr_data } = req.body;

    if (!qr_data) {
      return res.status(400).json({ message: 'QR data is required' });
    }

    const data = typeof qr_data === 'string' ? JSON.parse(qr_data) : qr_data;

    // Verify QR code exists
    const qrResult = await pool.query(
      'SELECT * FROM qr_codes WHERE order_id = $1',
      [data.order_id]
    );

    if (qrResult.rows.length === 0) {
      return res.status(404).json({ message: 'Invalid QR code' });
    }

    // Get order details
    const orderResult = await pool.query(
      `SELECT o.*, u.name as user_name, u.email as user_email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = $1`,
      [data.order_id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({
      valid: true,
      order: orderResult.rows[0],
    });
  } catch (error: any) {
    console.error('Scan QR code error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get QR codes for user
router.get('/my-codes', authenticate, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query(
      `SELECT qr.*, o.total_amount, o.status as order_status
       FROM qr_codes qr
       JOIN orders o ON qr.order_id = o.id
       WHERE qr.user_id = $1
       ORDER BY qr.created_at DESC`,
      [req.user!.id]
    );

    res.json({ qr_codes: result.rows });
  } catch (error: any) {
    console.error('Get QR codes error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

