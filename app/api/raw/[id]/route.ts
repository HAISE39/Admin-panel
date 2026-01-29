import { NextResponse } from 'next/server';
import { getScriptById, initDb } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const ua = request.headers.get('user-agent') || '';

  // LOGIC PROTEKSI RAW:
  // 1. Izinkan jika mengandung GameGuardian, Dalvik (Android), atau libcurl.
  // 2. Izinkan jika User-Agent kosong (umum di GG/custom loader).
  // 3. Blokir/Alihkan jika mengandung Mozilla, Chrome, Safari, dll (Browser Umum).

  const isAllowed = /GameGuardian|Dalvik|libcurl/i.test(ua) || ua === '';
  const isBrowser = /Mozilla|Chrome|Safari|Firefox|Edge|Opera/i.test(ua);

  // Jika terdeteksi perambah (browser) DAN bukan identitas khusus GG/Android Core, maka alihkan.
  if (isBrowser && !isAllowed) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const script = await getScriptById(id);

  if (script) {
    return new NextResponse(script.content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }

  return new NextResponse('Script not found', { status: 404 });
}
