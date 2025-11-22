import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// Helper function to render a listing card as HTML
function renderListingCard(listing) {
  const imageUrl = listing.image_url || '';
  const priceText = listing.price ? `$${listing.price}<span class="text-sm text-gray-500 dark:text-gray-400">/mån</span>` : 'Gratis';
  const featured = listing.featured ? '<span class="badge badge-success">Utvalda</span>' : '';

  return `
    <div class="card group" data-signals='{"liked": false}'>
      <div class="relative overflow-hidden">
        ${imageUrl ?
          `<img src="${imageUrl}" alt="${listing.title}" class="h-48 w-full object-cover">` :
          `<div class="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <svg class="w-20 h-20 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>`
        }
        ${featured ? `<div class="absolute top-4 right-4 flex gap-2">${featured}</div>` : ''}
        <button
          class="absolute top-4 left-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full backdrop-blur-sm transition-all hover:scale-110"
          data-on:click="liked = !liked"
          data-class:text-red-500="liked"
          data-class:text-gray-400="!liked"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          ${listing.title}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          ${listing.description || ''}
        </p>
        <div class="flex items-center justify-between mb-4">
          <span class="badge badge-primary">${listing.category_name || 'Okategoriserad'}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">${priceText}</span>
          <a href="/listing/${listing.id}" class="btn btn-primary text-sm py-2 px-4">
            Se mer
          </a>
        </div>
      </div>
    </div>
  `;
}

// GET /html/listings - Return listing cards as HTML
router.get('/listings', async (req, res) => {
  try {
    const { category, search, featured, limit = 50 } = req.query;

    let queryText = `
      SELECT
        l.*,
        c.name as category_name,
        c.slug as category_slug
      FROM listings l
      LEFT JOIN categories c ON l.category_id = c.id
      WHERE l.status = 'active'
    `;

    const queryParams = [];
    let paramCounter = 1;

    // Filter by category
    if (category && category !== 'all') {
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

    // Featured filter
    if (featured === 'true') {
      queryText += ` AND l.featured = true`;
    }

    queryText += ` ORDER BY l.featured DESC, l.created_at DESC`;
    queryText += ` LIMIT $${paramCounter}`;
    queryParams.push(parseInt(limit));

    const result = await query(queryText, queryParams);

    // Render all listing cards as HTML
    const htmlCards = result.rows.map(listing => renderListingCard(listing)).join('\n');

    // Return HTML with proper Datastar fragment swap
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(htmlCards);

  } catch (error) {
    console.error('Error fetching listings HTML:', error);
    res.status(500).send(`
      <div class="col-span-full text-center py-12">
        <p class="text-red-600 dark:text-red-400">Ett fel uppstod vid hämtning av listningar.</p>
      </div>
    `);
  }
});

export default router;
