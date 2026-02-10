"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setError(null);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/ui",
    });

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    // redirect manually (since redirect:false)
    window.location.href = result?.url ?? "/ui";
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-atlas-white-300 bg-secondary p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Log in</h1>

        <form action={onSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-white">Email</label>
            <input
              name="email"
              type="email"
              required
              defaultValue="user@atlasmail.com"
              className="w-full rounded-md border border-atlas-white-300 bg-white px-3 py-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-white">Password</label>
            <input
              name="password"
              type="password"
              required
              defaultValue="123456"
              className="w-full rounded-md border border-atlas-white-300 bg-white px-3 py-2"
            />
          </div>

          {error ? <p className="text-sm text-red-300">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-md bg-atlas-purple px-4 py-2 font-semibold text-white"
          >
            Log in
          </button>
        </form>
      </div>
    </main>
  );
}
