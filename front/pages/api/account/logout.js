import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return req.status(405).json({
      error: `Method ${req.method} not allowed`,
    });
  }

  res.setHeader('Set-Cookie', [
    cookie.serialize('access', '', {
      httpOnly: false,
      secure: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: new Date(0),
    }),
    cookie.serialize('refresh', '', {
      httpOnly: false,
      secure: true,
      sameSite: 'Lax',
      path: '/',
      maxAge: new Date(0),
    }),
  ]);

  return res.status(200).json({
    success: 'ログアウトに成功しました',
  });
}
