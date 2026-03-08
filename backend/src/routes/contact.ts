import express from 'express';
import { body, validationResult } from 'express-validator';
import { pool } from '../config/database';

const router = express.Router();

// Submit contact form
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, phone, service, message } = req.body;

      const result = await pool.query(
        `INSERT INTO contact_submissions (name, email, phone, service_interest, message)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, email, phone || null, service || null, message]
      );

      res.status(201).json({
        message: 'Contact form submitted successfully',
        submission: result.rows[0],
      });
    } catch (error: any) {
      console.error('Contact submission error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get all contact submissions (admin only - would need auth middleware in production)
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contact_submissions ORDER BY created_at DESC'
    );
    res.json({ submissions: result.rows });
  } catch (error: any) {
    console.error('Get contact submissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;

