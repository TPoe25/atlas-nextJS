"use client";

import { addAnswerAction } from "@/lib/actions";

export default function AnswerForm({ questionId }: { questionId: string }) {
  return (
    <form action={addAnswerAction} className="flex flex-col gap-3">
      <input type="hidden" name="questionId" value={questionId} />

      <textarea
        name="text"
        required
        placeholder="Type your answer..."
        className="h-28 w-full resize-none rounded-md border-2 border-blue-600 bg-white p-4 text-base outline-none"
      />

      <button
        type="submit"
        className="w-fit rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
}
