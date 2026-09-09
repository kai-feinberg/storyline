"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function SignUpForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setIsPending(false);

    if (signUpError) {
      setError(signUpError.message ?? "Unable to create your account.");
      return;
    }

    router.push("/app");
    router.refresh();
  };

  return (
    <Card className="w-full max-w-md border-border/70 bg-background/95">
      <CardHeader>
        <CardTitle className="text-2xl">Create account</CardTitle>
        <CardDescription>
          Start building StorySketch videos in your private workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="name" type="text" placeholder="Full name" required />
          <Input name="email" type="email" placeholder="Email" required />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            minLength={8}
            required
          />
          {error ? (
            <p className="text-sm text-geist-error">{error}</p>
          ) : null}
          <Button className="w-full" type="submit" loading={isPending}>
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>
        <p className="mt-4 text-sm text-subtitle">
          Already have an account?{" "}
          <Link className="text-foreground underline underline-offset-4" href="/sign-in">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
