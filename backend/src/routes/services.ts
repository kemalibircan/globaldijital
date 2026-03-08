import express from 'express';
import { pool } from '../config/database';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Get all services
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM services ORDER BY created_at DESC'
    );
    res.json({ services: result.rows });
  } catch (error: any) {
    console.error('Get services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get service by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM services WHERE id = $1', [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ service: result.rows[0] });
  } catch (error: any) {
    console.error('Get service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create service (admin only)
router.post('/', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { name, description, price, features, category } = req.body;

    const result = await pool.query(
      `INSERT INTO services (name, description, price, features, category)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, description, price, JSON.stringify(features || []), category]
    );

    res.status(201).json({ service: result.rows[0] });
  } catch (error: any) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update service (admin only)
router.put('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, features, category } = req.body;

    const result = await pool.query(
      `UPDATE services 
       SET name = $1, description = $2, price = $3, features = $4, category = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [name, description, price, JSON.stringify(features || []), category, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ service: result.rows[0] });
  } catch (error: any) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete service (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM services WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

