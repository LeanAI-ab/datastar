import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrate() {
  console.log('🔄 Starting database migration...');

  try {
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema
    await pool.query(schema);

    console.log('✅ Database migration completed successfully!');
    console.log('📊 Tables created:');
    console.log('   - categories');
    console.log('   - listings');
    console.log('   - users');
    console.log('   - favorites');
    console.log('📝 Sample data inserted');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
