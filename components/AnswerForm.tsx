"use client";

import { useState } from "react";

export default function AnswerForm({ questionId }: { questionId: string }) {
  const [text, setText] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Submit answer for question ${questionId}:\n\n${text}`);
    setText("");
  }

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Answer question"
        className="h-14 flex-1 rounded-xl border border-[#E5E7EB] bg-white px-6 text-lg outline-none focus:border-[#0B1B66]"
      />

      <button
        type="submit"
        className="h-14 rounded-xl bg-[#0B1B66] px-10 text-lg font-semibold text-white hover:opacity-90"
      >
        Answer
      </button>
    </form>
  );
}
