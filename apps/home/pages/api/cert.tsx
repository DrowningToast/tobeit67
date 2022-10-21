import { ImageResponse } from '@vercel/og'
import { NextApiRequest } from 'next'

export const config = {
  runtime: 'experimental-edge'
}

const font = fetch(
  new URL(
    "../../public/assets/fonts/Noto Sans Thai UI Regular.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer())

export default async function handler(req: NextApiRequest) {
  const fontData = await font
  
  const { searchParams } = new URL(req.url as string)
  const userId = searchParams.get('id') || ''

  const firstname = ''
  const lastname = ''

  if (!userId) {
    return new ImageResponse((
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        <h1 style={{
          fontSize: 90,
          fontFamily: '"Noto Sans Thai"',
          zIndex: 200
          }}>
          User not found!
        </h1>
      </div>
    ), {
      width: 2527,
      height: 1785
    })
  }

  return new ImageResponse((
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <img src="https://i2.paste.pics/d9f3c0afb281a8305fa97d5aaeb78a57.png" width="2527" height="1785" />
      <h1 style={{
        position: 'absolute',
        fontFamily: '"Noto Sans Thai"',
        top: '37.5%',
        fontSize: 90,
        zIndex: '200'
        }}>
        {firstname} {lastname}
      </h1>
    </div>
  ), {
    width: 2527,
    height: 1785,
    fonts: [
      {
        data: fontData,
        name: 'Noto Sans Thai',
        style: 'normal'
      }
    ]
  })
}