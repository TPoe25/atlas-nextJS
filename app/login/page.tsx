"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("user@atlasmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState<string | null>(null);

  async function onCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/ui",
    });

  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 p-8">
      <h1 className="text-3xl font-extrabold">Login</h1>

      <form onSubmit={onCredentialsLogin} className="flex flex-col gap-3">
        <label className="text-sm font-semibold">Email</label>
        <input
          className="rounded-md border p-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />

        <label className="text-sm font-semibold">Password</label>
        <input
          className="rounded-md border p-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button className="mt-2 rounded-md bg-black px-4 py-3 text-white">
          Sign in
        </button>

        <p className="text-sm text-gray-600">
          Test login: <b>user@atlasmail.com</b> / <b>123456</b>
        </p>
      </form>

      <div className="my-2 h-px bg-gray-200" />

      <button
        onClick={() => signIn("github", { callbackUrl: "/ui" })}
        className="rounded-md border px-4 py-3"
      >
        Sign in with GitHub
      </button>
    </main>
  );
}
