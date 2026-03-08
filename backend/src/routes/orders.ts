import express from 'express';
import { pool } from '../config/database';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all orders (authenticated users see their own, admin sees all)
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    let result;
    if (req.user!.role === 'admin') {
      result = await pool.query(
        `SELECT o.*, u.name as user_name, u.email as user_email
         FROM orders o
         JOIN users u ON o.user_id = u.id
         ORDER BY o.created_at DESC`
      );
    } else {
      result = await pool.query(
        'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
        [req.user!.id]
      );
    }
    res.json({ orders: result.rows });
  } catch (error: any) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get order by ID
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT o.*, u.name as user_name, u.email as user_email
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = result.rows[0];

    // Check authorization
    if (req.user!.role !== 'admin' && order.user_id !== req.user!.id) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json({ order });
  } catch (error: any) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create order
router.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { service_ids, total_amount, notes } = req.body;

    if (!service_ids || !Array.isArray(service_ids) || service_ids.length === 0) {
      return res.status(400).json({ message: 'Service IDs are required' });
    }

    // Verify services exist
    const servicesResult = await pool.query(
      'SELECT id, price FROM services WHERE id = ANY($1)',
      [service_ids]
    );

    if (servicesResult.rows.length !== service_ids.length) {
      return res.status(400).json({ message: 'One or more services not found' });
    }

    // Create order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, service_ids, total_amount, status, notes)
       VALUES ($1, $2, $3, 'pending', $4)
       RETURNING *`,
      [
        req.user!.id,
        service_ids,
        total_amount || servicesResult.rows.reduce((sum, s) => sum + parseFloat(s.price), 0),
        notes || null,
      ]
    );

    const order = orderResult.rows[0];

    // Create order items
    for (const serviceId of service_ids) {
      await pool.query(
        'INSERT INTO order_items (order_id, service_id) VALUES ($1, $2)',
        [order.id, serviceId]
      );
    }

    res.status(201).json({ order });
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (admin only)
router.patch('/:id/status', authenticate, async (req: AuthRequest, res) => {
  try {
    if (req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ order: result.rows[0] });
  } catch (error: any) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

