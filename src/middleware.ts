import exp from "constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const getServerCookies = () => {
  const clientCookies = cookies();
  const str = clientCookies.get("auth")?.value;
  if (str) {
    return JSON.parse(str);
  }
  return null;
};

export async function middleware(request: NextRequest) {
  const auth = getServerCookies();

  if (!auth) {
    return NextResponse.redirect(new URL("/?auth=true", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blissbells", "/profile"],
};
