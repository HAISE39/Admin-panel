import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iUr4Poatpc6z@ep-wandering-block-ahwpq5ny-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function checkSchema() {
  try {
    const rows = await sql`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'scripts' AND column_name = 'id'
    `;
    console.log('Column definition:', rows[0]);
  } catch (err) {
    console.error('Schema check failed:', err);
  }
}

checkSchema();
