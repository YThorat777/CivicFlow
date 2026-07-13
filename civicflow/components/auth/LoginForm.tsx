"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input, Label, FieldError } from "@/components/ui/Field";
import { DEMO_USER } from "@/lib/mock-data";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);
    if (result.ok) {
      router.push("/dashboard");
    } else {
      setError(result.error ?? "Sign in failed. Please try again.");
    }
  }

  function fillDemoCredentials() {
    setEmail(DEMO_USER.email);
    setPassword(DEMO_USER.password);
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm" noValidate>
      <div className="mb-5">
        <Label htmlFor="email" required>
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>

      <div className="mb-2">
        <Label htmlFor="password" required>
          Password
        </Label>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <FieldError>{error ?? undefined}</FieldError>

      <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Verifying credentials…" : "Sign in"}
      </Button>

      <div className="mt-5 rounded-md border border-dashed border-ink-200 bg-ink-50 px-3.5 py-3 text-xs text-ink-600">
        <p className="font-medium text-ink-700">Demo access</p>
        <p className="mt-1 leading-relaxed">
          Sign in with the demo citizen account to experience the portal's functionality.
        </p>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="mt-2 font-medium text-signal-dark underline underline-offset-2 hover:text-signal"
        >
          Fill in demo credentials
        </button>
      </div>
    </form>
  );
}
