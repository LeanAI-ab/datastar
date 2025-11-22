-- Database Schema for Directory Application
-- Run this SQL in your Neon Postgres console or via psql

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  image_url VARCHAR(500),
  tags TEXT[],
  website_url VARCHAR(500),
  contact_email VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create users table (for future authentication)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create favorites table (for user favorites)
CREATE TABLE IF NOT EXISTS favorites (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  listing_id INTEGER REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (user_id, listing_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON listings(featured);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon) VALUES
  ('Teknologi', 'teknologi', 'Tech-produkter och tjänster', '💻'),
  ('Design', 'design', 'Design-verktyg och resurser', '🎨'),
  ('Marknadsföring', 'marknadsforing', 'Marketing-verktyg och tjänster', '📊'),
  ('Produktivitet', 'produktivitet', 'Produktivitetsverktyg', '⚡'),
  ('Utbildning', 'utbildning', 'Utbildningsplattformar och kurser', '📚'),
  ('E-handel', 'e-handel', 'E-handelsplattformar och verktyg', '🛍️')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample listings
INSERT INTO listings (title, description, price, category_id, image_url, tags, website_url, featured, status) VALUES
  (
    'CloudFlow Pro',
    'En kraftfull molnbaserad projekthanteringsplattform som hjälper team att samarbeta effektivt.',
    299.00,
    (SELECT id FROM categories WHERE slug = 'produktivitet'),
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop',
    ARRAY['projekthantering', 'moln', 'samarbete'],
    'https://example.com/cloudflow',
    true,
    'active'
  ),
  (
    'DesignHub Studio',
    'Komplett designverktyg för moderna designers. Inkluderar vektorritning, prototyping och mer.',
    199.00,
    (SELECT id FROM categories WHERE slug = 'design'),
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop',
    ARRAY['design', 'UI/UX', 'prototyping'],
    'https://example.com/designhub',
    true,
    'active'
  ),
  (
    'MarketBoost AI',
    'AI-driven marknadsföringsplattform som automatiserar dina kampanjer och maximerar ROI.',
    499.00,
    (SELECT id FROM categories WHERE slug = 'marknadsforing'),
    'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&auto=format&fit=crop',
    ARRAY['AI', 'marknadsföring', 'automation'],
    'https://example.com/marketboost',
    true,
    'active'
  ),
  (
    'CodeMaster Academy',
    'Lär dig programmera med interaktiva kurser från nybörjare till expert.',
    149.00,
    (SELECT id FROM categories WHERE slug = 'utbildning'),
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop',
    ARRAY['programmering', 'kurser', 'online'],
    'https://example.com/codemaster',
    false,
    'active'
  ),
  (
    'ShopEasy Platform',
    'Bygg din e-handelsbutik på minuter. Ingen teknisk kunskap krävs.',
    89.00,
    (SELECT id FROM categories WHERE slug = 'e-handel'),
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
    ARRAY['e-handel', 'webshop', 'no-code'],
    'https://example.com/shopeasy',
    false,
    'active'
  ),
  (
    'DataViz Pro',
    'Skapa fantastiska datavisualiseringar och interaktiva dashboards.',
    249.00,
    (SELECT id FROM categories WHERE slug = 'teknologi'),
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop',
    ARRAY['data', 'visualisering', 'analytics'],
    'https://example.com/dataviz',
    false,
    'active'
  )
ON CONFLICT DO NOTHING;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
