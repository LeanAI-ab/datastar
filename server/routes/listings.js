import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// GET /api/listings - Get all listings with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, sort = 'created_at', order = 'DESC', limit = 50, offset = 0 } = req.query;

    let queryText = `
      SELECT
        l.*,
        c.name as category_name,
        c.slug as category_slug
      FROM listings l
      LEFT JOIN categories c ON l.category_id = c.id
      WHERE 1=1
    `;

    const queryParams = [];
    let paramCounter = 1;

    // Filter by category
    if (category) {
      queryText += ` AND c.slug = $${paramCounter}`;
      queryParams.push(category);
      paramCounter++;
    }

    // Search filter
    if (search) {
      queryText += ` AND (l.title ILIKE $${paramCounter} OR l.description ILIKE $${paramCounter})`;
      queryParams.push(`%${search}%`);
      paramCounter++;
    }

    // Sorting
    const validSortFields = ['created_at', 'title', 'price', 'updated_at'];
    const sortField = validSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    queryText += ` ORDER BY l.${sortField} ${sortOrder}`;

    // Pagination
    queryText += ` LIMIT $${paramCounter} OFFSET $${paramCounter + 1}`;
    queryParams.push(parseInt(limit), parseInt(offset));

    const result = await query(queryText, queryParams);

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length,
      pagination: {
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch listings',
      message: error.message
    });
  }
});

// GET /api/listings/:id - Get a single listing by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT
        l.*,
        c.name as category_name,
        c.slug as category_slug
      FROM listings l
      LEFT JOIN categories c ON l.category_id = c.id
      WHERE l.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Listing not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching listing:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch listing',
      message: error.message
    });
  }
});

// POST /api/listings - Create a new listing (for testing/admin)
router.post('/', async (req, res) => {
  try {
    const { title, description, price, category_id, image_url, tags } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Title and description are required'
      });
    }

    const result = await query(
      `INSERT INTO listings (title, description, price, category_id, image_url, tags)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, price, category_id, image_url, tags]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Listing created successfully'
    });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create listing',
      message: error.message
    });
  }
});

export default router;
