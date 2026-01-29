import { NextResponse } from 'next/server';
import { getScriptById, initDb } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const ua = request.headers.get('user-agent') || '';

  // Perketat proteksi: Hanya alihkan jika terdeteksi Desktop Browser
  // Izinkan jika mengandung GameGuardian, Android, Dalvik, atau jika UA kosong (umum di GG)
  const isMobileOrGG = /GameGuardian|Android|Dalvik|iPhone|iPad/i.test(ua) || ua === '';
  const isDesktopBrowser = /Windows|Macintosh|X11/i.test(ua) && /Mozilla|Chrome|Safari|Firefox/i.test(ua);

  // Alihkan hanya jika itu Desktop Browser dan tidak ada tanda-tanda GameGuardian
  if (isDesktopBrowser && !/GameGuardian/i.test(ua)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Jika User Agent mengandung perambah umum tapi bukan mobile/GG, tetap alihkan untuk keamanan
  if (!isMobileOrGG && /Mozilla|Chrome|Safari|Edge|Firefox/i.test(ua)) {
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
