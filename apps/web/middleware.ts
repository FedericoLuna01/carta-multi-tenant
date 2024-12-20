import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth(async (req) => {
  const url = req.nextUrl;
  let hostname = req.headers.get("host") || '';

  // Remove port if it exists
  hostname = hostname.split(':')[0];

  // Define allowed domains (including main domain and localhost)
  const allowedDomains = ["carta.ar", "www.carta.ar", "localhost"];

  // Check if the current hostname is in the list of allowed domains
  const isMainDomain = allowedDomains.includes(hostname);

  // Extract subdomain if not a main domain
  const subdomain = isMainDomain ? null : hostname.split('.')[0];

  // console.log('Middleware: Hostname:', hostname);
  // console.log('Middleware: Subdomain:', subdomain);

  // If it's a main domain, allow the request to proceed
  if (isMainDomain) {
    // console.log('Middleware: Main domain detected, passing through');
    return NextResponse.next();
  }

  // Handle subdomain logic
  if (subdomain) {
    return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
  }
});

// Path donde el middleware no se va a ejecutar
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/api/:path*"],
};
