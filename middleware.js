// HTTP Basic Auth for the whole site, enforced at the Vercel edge.
//
// Credentials are read from environment variables so they are NOT committed
// to this (public) repo. Set these in the Vercel dashboard
// (Project → Settings → Environment Variables) and redeploy:
//
//   BASIC_AUTH_USER       e.g. odlings
//   BASIC_AUTH_PASSWORD   e.g. a strong shared password
//
// If the variables are not set, the middleware fails closed (denies everyone)
// rather than leaving the site open.

export const config = {
  // Protect every route.
  matcher: '/:path*',
};

export default function middleware(request) {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASSWORD;

  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');

  if (scheme === 'Basic' && encoded && expectedUser && expectedPass) {
    const decoded = atob(encoded);
    const sep = decoded.indexOf(':');
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);

    if (user === expectedUser && pass === expectedPass) {
      // Authenticated — let the request through to the static site.
      return;
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate':
        'Basic realm="Francis — Model Comparison", charset="UTF-8"',
    },
  });
}
