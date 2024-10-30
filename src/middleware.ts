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
const protectedRoutes = ["/blissbells", "/profile"];

export async function middleware(request: NextRequest) {
  const auth = getServerCookies();
  const route = request.nextUrl.pathname;
  const url = new URL(request.url);
  console.log({ route });

  for (let r of protectedRoutes) {
    if (!auth) {
      if (route.includes(r)) {
        const isExists = url.searchParams.get("auth");
        if (isExists) {
          return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/?auth=true", request.url));
      }
    }
  }

  if (auth) {
    if (url.searchParams.get("auth")) {
      url.searchParams.delete("auth");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
