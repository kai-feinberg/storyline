import { headers } from "next/headers";

import { auth } from "@/lib/auth";

export const getSession = async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
};
