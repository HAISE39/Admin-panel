import { NextResponse } from 'next/server';
import { getScripts, createScript, initDb } from '@/lib/db';

export async function GET() {
  await initDb(); // Auto-init table
  const data = await getScripts();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  // Server-side auth check
  const auth = request.headers.get('cookie')?.includes('auth=true');
  if (!auth) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const newScript = await createScript(body.name, body.content);

  if (newScript) {
    return NextResponse.json(newScript);
  }

  return NextResponse.json({ message: 'Failed to create script' }, { status: 500 });
}
