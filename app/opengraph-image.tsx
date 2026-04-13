import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Veneer - Create Your Beautiful Bio Card';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F9F9F9',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: '#000',
              margin: 0,
            }}
          >
            Veneer.
          </h1>
          <p
            style={{
              fontSize: '40px',
              color: '#666',
              margin: 0,
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            Create Your Beautiful Bio Card
          </p>
          <p
            style={{
              fontSize: '28px',
              color: '#999',
              margin: 0,
            }}
          >
            Share Your Links • Showcase Your Brand
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
