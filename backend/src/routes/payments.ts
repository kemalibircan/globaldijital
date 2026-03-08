import express from 'express';
import { pool } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Process payment
router.post('/process', authenticate, async (req: AuthRequest, res) => {
  try {
    const { order_id, payment_method, card_token } = req.body;

    // Get order
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
      [order_id, req.user!.id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orderResult.rows[0];

    if (order.status === 'completed') {
      return res.status(400).json({ message: 'Order already paid' });
    }

    // In a real implementation, you would integrate with a payment gateway here
    // For now, we'll simulate a successful payment
    const transaction_id = uuidv4();
    const payment_status = 'completed';

    // Create payment record
    const paymentResult = await pool.query(
      `INSERT INTO payments (order_id, user_id, amount, payment_method, transaction_id, status)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        order_id,
        req.user!.id,
        order.total_amount,
        payment_method || 'card',
        transaction_id,
        payment_status,
      ]
    );

    // Update order status
    await pool.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2',
      ['confirmed', order_id]
    );

    res.json({
      message: 'Payment processed successfully',
      payment: paymentResult.rows[0],
    });
  } catch (error: any) {
    console.error('Process payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get payment history
router.get('/history', authenticate, async (req: AuthRequest, res) => {
  try {
    let result;
    if (req.user!.role === 'admin') {
      result = await pool.query(
        `SELECT p.*, o.total_amount, o.status as order_status
         FROM payments p
         JOIN orders o ON p.order_id = o.id
         ORDER BY p.created_at DESC`
      );
    } else {
      result = await pool.query(
        `SELECT p.*, o.total_amount, o.status as order_status
         FROM payments p
         JOIN orders o ON p.order_id = o.id
         WHERE p.user_id = $1
         ORDER BY p.created_at DESC`,
        [req.user!.id]
      );
    }
    res.json({ payments: result.rows });
  } catch (error: any) {
    console.error('Get payments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get payment by ID
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT p.*, o.total_amount, o.status as order_status
       FROM payments p
       JOIN orders o ON p.order_id = o.id
       WHERE p.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    const payment = result.rows[0];

    // Check authorization
    if (req.user!.role !== 'admin' && payment.user_id !== req.user!.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json({ payment });
  } catch (error: any) {
    console.error('Get payment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

