import { redirect } from "next/navigation";

import { AppShellHeader } from "@/components/app-shell-header";
import { getSession } from "@/lib/session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen">
      <AppShellHeader
        email={session.user.email}
        name={session.user.name ?? session.user.email}
      />
      <main className="w-full">{children}</main>
    </div>
  );
}
