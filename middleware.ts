import { NextResponse } from "next/server";

import { auth } from "@/auth";

export default auth((req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];

  // Verificar si es un subdominio válido
  if (subdomain !== "www" && subdomain !== "carta") {
    // Lista de rutas que no deben ser reescritas
    const excludedPaths = ["/api", "/dashboard", "/_next", "/favicon.ico"];
    const shouldRewrite = !excludedPaths.some((path) =>
      url.pathname.startsWith(path)
    );

    if (shouldRewrite) {
      // Redirigir a la página del tenant
      url.pathname = `/${subdomain}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
});

// Path donde el middleware no se va a ejecutar
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
