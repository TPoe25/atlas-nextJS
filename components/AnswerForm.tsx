"use client";

import { useState } from "react";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const [text, setText] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // UI-only for Task 1 — no DB call yet
    alert(`(UI only) Submit answer for question ${questionId}:\n\n${text}`);

    setText("");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-white">
        Submit an answer
      </label>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your answer..."
        required
        rows={3}
        className="w-full rounded-md border border-atlas-white-300 bg-white p-3 text-black"
      />

      <button
        type="submit"
        className="w-fit rounded-md bg-atlas-purple px-4 py-2 font-semibold text-white hover:opacity-90"
      >
        Submit
      </button>
    </form>
  );
}
