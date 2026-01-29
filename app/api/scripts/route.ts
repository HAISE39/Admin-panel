import { NextResponse } from 'next/server';
import { readScripts, writeScripts, Script } from '@/lib/db';

export async function GET() {
  const data = readScripts();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  // Server-side auth check
  const auth = request.headers.get('cookie')?.includes('auth=true');
  if (!auth) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const data = readScripts();
  const newScript: Script = {
    ...body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  data.push(newScript);
  writeScripts(data);
  return NextResponse.json(newScript);
}
