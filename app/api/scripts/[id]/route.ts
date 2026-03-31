import { NextResponse } from 'next/server';
import { getScriptById, updateScript, deleteScript } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Server-side auth check
  const auth = request.headers.get('cookie')?.includes('auth=true');
  if (!auth) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const updated = await updateScript(id, body.name, body.content);

  if (updated) {
    return NextResponse.json(updated);
  }

  return NextResponse.json({ message: 'Script not found' }, { status: 404 });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Server-side auth check
  const auth = request.headers.get('cookie')?.includes('auth=true');
  if (!auth) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const success = await deleteScript(id);

  if (success) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ message: 'Failed to delete script' }, { status: 500 });
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const script = await getScriptById(id);

  if (script) {
    return NextResponse.json(script);
  }

  return NextResponse.json({ message: 'Script not found' }, { status: 404 });
}
