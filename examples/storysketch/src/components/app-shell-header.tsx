import Link from "next/link";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { StorySketchLogo } from "@/components/storysketch-logo";

type AppShellHeaderProps = {
  email: string;
  name: string;
};

export function AppShellHeader({ email, name }: AppShellHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#d8cfbf] bg-[#fbf8f1]/95 backdrop-blur-sm">
      <div className="flex h-14 w-full items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <Link className="flex items-center gap-3 text-sm font-semibold tracking-[0.22em] uppercase text-[#1f1c18]" href="/app">
            <StorySketchLogo className="h-8 w-8 text-[#1f1c18]" />
            StorySketch
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-[#1f1c18]">{name}</p>
            <p className="text-xs text-[#7a7064]">{email}</p>
          </div>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
