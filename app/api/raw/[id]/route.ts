import { NextResponse } from 'next/server';
import { getScriptById } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ua = request.headers.get('user-agent') || '';

  // Basic browser detection
  const isBrowser = /Mozilla|Chrome|Safari|Edge|Firefox/i.test(ua);

  if (isBrowser) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const script = await getScriptById(id);

  if (script) {
    return new Response(script.content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }

  return new Response('Script not found', { status: 404 });
}
