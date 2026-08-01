import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // On protège uniquement les routes qui commencent par /admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // On autorise la page de login
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin_session")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const payload = await verifyJwt(token);
    
    if (!payload || !payload.adminId) {
      // Token invalide ou expiré
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.delete("admin_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
