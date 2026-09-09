"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleSignOut = async () => {
    setIsPending(true);
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Button variant="secondary" size="sm" onClick={handleSignOut} loading={isPending}>
      {isPending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
