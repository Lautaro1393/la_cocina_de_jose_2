import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

/**
 * Webhook de Sanity para invalidar el cache del menú.
 *
 * Configurar en sanity.io/manage:
 *   - Project → API → Webhooks → Create
 *   - URL: https://<tu-dominio>/api/revalidate
 *   - Trigger on: Create, Update, Delete
 *   - Filter: _type == "dish" || _type == "category"
 *   - Secret: REVALIDATE_SECRET
 *
 * O para dev manual: curl -X POST http://localhost:3000/api/revalidate
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;

  if (secret) {
    const provided =
      request.headers.get('x-sanity-webhook-secret') ??
      new URL(request.url).searchParams.get('secret');
    if (provided !== secret) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
  }

  revalidateTag('menu');

  return NextResponse.json({
    revalidated: true,
    tag: 'menu',
    now: Date.now(),
  });
}
