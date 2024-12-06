import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");
  const url = req.nextUrl.clone();

  // Define the public routes that are accessible without a token
  const publicRoutes = ["/", "/auth/login", "/auth/register"];

  // If the user is logged in, prevent access to login and register routes
  if (token) {
    if (url.pathname === "/auth/login" || url.pathname === "/auth/register") {
      // Redirect logged-in users to a different route (e.g., the dashboard or home)
      url.pathname = "/"; // Change this to your desired route
      return NextResponse.redirect(url);
    }
  } else {
    // If not logged in, ensure that restricted routes redirect to login
    if (!publicRoutes.includes(url.pathname)) {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
