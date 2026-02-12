"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-full rounded-md border border-atlas-white-300 px-4 py-2 text-left hover:opacity-90"
    >
      Sign out
    </button>
  );
}
