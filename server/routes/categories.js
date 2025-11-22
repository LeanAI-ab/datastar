import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT
        c.*,
        COUNT(l.id) as listing_count
      FROM categories c
      LEFT JOIN listings l ON l.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name ASC`
    );

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      message: error.message
    });
  }
});

// GET /api/categories/:slug - Get a single category by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const result = await query(
      `SELECT
        c.*,
        COUNT(l.id) as listing_count
      FROM categories c
      LEFT JOIN listings l ON l.category_id = c.id
      WHERE c.slug = $1
      GROUP BY c.id`,
      [slug]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch category',
      message: error.message
    });
  }
});

export default router;
