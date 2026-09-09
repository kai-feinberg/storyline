import { redirect } from "next/navigation";

import { SignInForm } from "@/components/auth/sign-in-form";
import { getSession } from "@/lib/session";

export default async function SignInPage() {
  const session = await getSession();

  if (session) {
    redirect("/app");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <SignInForm />
    </main>
  );
}
