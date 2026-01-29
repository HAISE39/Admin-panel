import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_iUr4Poatpc6z@ep-wandering-block-ahwpq5ny-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require');

export interface Script {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

// Map database row to our Script interface
function mapRow(row: any): Script {
  return {
    id: row.id.toString(),
    name: row.name,
    content: row.content,
    createdAt: row.created_at.toISOString(),
  };
}

export async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS scripts (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Database initialized');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

export async function getScripts(): Promise<Script[]> {
  try {
    const rows = await sql`SELECT * FROM scripts ORDER BY created_at DESC`;
    return rows.map(mapRow);
  } catch (error) {
    console.error('Error fetching scripts:', error);
    return [];
  }
}

export async function getScriptById(id: string): Promise<Script | null> {
  try {
    const rows = await sql`SELECT * FROM scripts WHERE id = ${parseInt(id)}`;
    if (rows.length === 0) return null;
    return mapRow(rows[0]);
  } catch (error) {
    console.error('Error fetching script by id:', error);
    return null;
  }
}

export async function createScript(name: string, content: string): Promise<Script | null> {
  try {
    const rows = await sql`
      INSERT INTO scripts (name, content)
      VALUES (${name}, ${content})
      RETURNING *
    `;
    return mapRow(rows[0]);
  } catch (error) {
    console.error('Error creating script:', error);
    return null;
  }
}

export async function updateScript(id: string, name: string, content: string): Promise<Script | null> {
  try {
    const rows = await sql`
      UPDATE scripts
      SET name = ${name}, content = ${content}
      WHERE id = ${parseInt(id)}
      RETURNING *
    `;
    if (rows.length === 0) return null;
    return mapRow(rows[0]);
  } catch (error) {
    console.error('Error updating script:', error);
    return null;
  }
}

export async function deleteScript(id: string): Promise<boolean> {
  try {
    const result = await sql`DELETE FROM scripts WHERE id = ${parseInt(id)}`;
    return true; // Simple success assumption
  } catch (error) {
    console.error('Error deleting script:', error);
    return false;
  }
}
