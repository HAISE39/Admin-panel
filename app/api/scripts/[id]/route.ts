import { NextResponse } from 'next/server';
import { readScripts, writeScripts } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Server-side auth check
  const auth = request.headers.get('cookie')?.includes('auth=true');
  if (!auth) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  let data = readScripts();
  const index = data.findIndex((s) => s.id === id);

  if (index !== -1) {
    data[index] = { ...data[index], ...body, id };
    writeScripts(data);
    return NextResponse.json(data[index]);
  }

  return NextResponse.json({ message: 'Script not found' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Server-side auth check
  const auth = request.headers.get('cookie')?.includes('auth=true');
  if (!auth) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  let data = readScripts();
  const initialLength = data.length;
  data = data.filter((s) => s.id !== id);

  if (data.length < initialLength) {
    writeScripts(data);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ message: 'Script not found' }, { status: 404 });
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = readScripts();
  const script = data.find((s) => s.id === id);

  if (script) {
    return NextResponse.json(script);
  }

  return NextResponse.json({ message: 'Script not found' }, { status: 404 });
}
