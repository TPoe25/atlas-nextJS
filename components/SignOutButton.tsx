"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="w-full text-left rounded-md px-3 py-2 hover:opacity-90"
    >
      Sign out
    </button>
  );
}
