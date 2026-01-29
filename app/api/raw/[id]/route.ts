import { NextResponse } from 'next/server';
import { getScriptById } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ua = request.headers.get('user-agent') || '';

  // Perketat proteksi: Izinkan GameGuardian, blokir perambah (browser)
  const isGameGuardian = /GameGuardian/i.test(ua);
  const isCommonBrowser = /Mozilla|Chrome|Safari|Edge|Firefox/i.test(ua);

  // Jika terdeteksi browser DAN bukan GameGuardian, maka alihkan ke halaman utama
  if (isCommonBrowser && !isGameGuardian) {
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
