import { redirect } from "next/navigation";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { getSession } from "@/lib/session";

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    redirect("/app");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <SignUpForm />
    </main>
  );
}
