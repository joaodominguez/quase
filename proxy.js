import { NextResponse } from "next/server";

/**
 * Basic Auth no /admin — mesmo padrão do VagaSaúde.
 * Credenciais: ADMIN_USER + ADMIN_PASSWORD.
 */
export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.next();
    }
    return new NextResponse("Backoffice indisponível.", { status: 503 });
  }

  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Basic ")) {
    try {
      const credentials = atob(authorization.slice(6));
      const separator = credentials.indexOf(":");
      const user = credentials.slice(0, separator);
      const password = credentials.slice(separator + 1);

      if (
        separator > 0 &&
        user === expectedUser &&
        password === expectedPassword
      ) {
        return NextResponse.next();
      }
    } catch {
      // Novo desafio de autenticação.
    }
  }

  return new NextResponse("Autenticação necessária.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="quase Backoffice", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
