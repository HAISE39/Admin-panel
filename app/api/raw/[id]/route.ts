import { NextResponse } from 'next/server';
import { getScriptById, initDb } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await initDb();
  const { id } = await params;
  const ua = request.headers.get('user-agent') || '';

  // LOGIC: Hanya alihkan jika terdeteksi Desktop Browser murni.
  // Jika mengandung GameGuardian, Android, atau jika UA kosong/mobile, izinkan.
  const isDesktop = /Windows|Macintosh|X11/i.test(ua);
  const isGameGuardian = /GameGuardian/i.test(ua);
  const isMobile = /Android|Dalvik|iPhone|iPad/i.test(ua);

  // Jika itu Desktop DAN bukan GameGuardian DAN bukan Mobile Agent, alihkan ke Home (404 stealth)
  if (isDesktop && !isGameGuardian && !isMobile) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Jika User Agent sangat mencurigakan sebagai Browser Desktop tapi mencoba menyamar tanpa Mobile tag
  const isGenericBrowser = /Mozilla|Chrome|Safari|Firefox/i.test(ua);
  if (isGenericBrowser && !isMobile && !isGameGuardian && !ua.includes('Dalvik')) {
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
