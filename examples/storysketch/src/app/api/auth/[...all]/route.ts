import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/lib/auth";
import { withEvlog } from "@/lib/evlog";

const handlers = toNextJsHandler(auth);

export const GET = withEvlog(handlers.GET);
export const POST = withEvlog(handlers.POST);
