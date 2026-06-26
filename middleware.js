// HTTP Basic Auth for the whole site, enforced at the Vercel edge.
//
// Credentials are hardcoded below for a simple shared login. Environment
// variables (BASIC_AUTH_USER / BASIC_AUTH_PASSWORD), if set in Vercel,
// take precedence over these defaults.
//
// NOTE: this repo is public, so these hardcoded credentials are visible in
// the source. Use a private repo or environment variables if that matters.

export const config = {
  // Protect every route.
  matcher: '/:path*',
};

export default function middleware(request) {
  const expectedUser = process.env.BASIC_AUTH_USER || 'haider@nexverse.co.uk';
  const expectedPass = process.env.BASIC_AUTH_PASSWORD || 'Password@2026!';

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
        'Basic realm="Francis Model Comparison", charset="UTF-8"',
    },
  });
}
