import fs from 'fs';
import path from 'path';

/**
 * PENTING: Untuk deployment Vercel, file system bersifat read-only.
 * Sangat disarankan untuk menggunakan Vercel KV, MongoDB, atau Supabase.
 *
 * Tutorial Vercel KV: https://vercel.com/docs/storage/vercel-kv
 */

const DATA_FILE = process.env.NODE_ENV === 'production'
  ? path.join('/tmp', 'scripts.json')
  : path.join(process.cwd(), 'scripts.json');

export interface Script {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

export function readScripts(): Script[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      // Inisialisasi dengan data default jika file tidak ada
      const defaultData: Script[] = [];
      // Jika di local dan file root ada, gunakan itu
      const localFile = path.join(process.cwd(), 'scripts.json');
      if (fs.existsSync(localFile) && DATA_FILE !== localFile) {
        return JSON.parse(fs.readFileSync(localFile, 'utf-8'));
      }
      return defaultData;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading scripts:', error);
    return [];
  }
}

export function writeScripts(scripts: Script[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(scripts, null, 2));
  } catch (error) {
    console.error('Error writing scripts:', error);
    // Di Vercel ini akan gagal jika bukan di /tmp
  }
}
