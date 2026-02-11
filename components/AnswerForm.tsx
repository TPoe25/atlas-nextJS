"use client";

import { useState } from "react";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const [text, setText] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    alert(`Submit answer for ${questionId}:\n\n${text}`);
    setText("");
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your answer..."
        className="min-h-22.5 w-full rounded-md border border-atlas-white-300 p-3 outline-none focus:ring-2 focus:ring-atlas-teal"
      />
      <div>
        <button
          type="submit"
          className="rounded-md bg-atlas-navy px-5 py-2 font-semibold text-white hover:opacity-90"
        >
          Answer
        </button>
      </div>
    </form>
  );
}
