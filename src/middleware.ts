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

  // if logged in and going to login screen then send don't let modal to open
  // this logic in header component

  return NextResponse.next();
}

export const config = {
  matcher: ["/blissbells", "/profile"],
};
