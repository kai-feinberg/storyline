import { evlogMiddleware } from "evlog/next";

export const proxy = evlogMiddleware({
  include: ["/api/**"],
});

export const config = {
  matcher: ["/api/:path*"],
};
