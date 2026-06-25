import { ImageResponse } from 'next/og';
import { getMenu } from '@/lib/menu';
import { RESTAURANT } from '@/lib/constants';
import { formatARS } from '@/lib/format';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const menu = await getMenu();
  const featured = menu[0]?.dishes[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0f0a08',
          color: '#fdf6ec',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 20% 30%, rgba(177,66,47,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(177,66,47,0.25) 0%, transparent 55%), linear-gradient(135deg, #0f0a08 0%, #1a0f0a 100%)',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            padding: '64px 80px',
            height: '100%',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 22,
                color: '#b1422f',
                letterSpacing: 6,
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              {RESTAURANT.tagline}
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              {RESTAURANT.name}
            </div>
            <div
              style={{
                fontSize: 28,
                color: 'rgba(253,246,236,0.72)',
                marginTop: 8,
                maxWidth: 820,
              }}
            >
              Pedí por WhatsApp en 3 clics. Milanesas, pizzas, pastas y todo lo
              que se cocina en casa de José.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 32,
            }}
          >
            {featured ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  background: 'rgba(255,248,240,0.06)',
                  border: '1px solid rgba(255,248,240,0.12)',
                  borderRadius: 16,
                  padding: '20px 24px',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(253,246,236,0.48)',
                    textTransform: 'uppercase',
                    letterSpacing: 4,
                  }}
                >
                  Sugerencia de hoy
                </div>
                <div style={{ fontSize: 32, fontWeight: 600 }}>
                  {featured.name}
                </div>
                <div
                  style={{
                    fontSize: 24,
                    color: '#b1422f',
                    fontWeight: 700,
                  }}
                >
                  {formatARS(featured.price)}
                </div>
              </div>
            ) : null}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 8,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  color: 'rgba(253,246,236,0.72)',
                  textTransform: 'uppercase',
                  letterSpacing: 4,
                }}
              >
                Pedí por WhatsApp
              </div>
              <div style={{ fontSize: 38, fontWeight: 700 }}>
                {RESTAURANT.whatsappDisplay}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
