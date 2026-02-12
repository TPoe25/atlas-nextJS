"use client";

import { markAnswerAction } from "@/lib/actions";

type Props = {
  id: string;
  text: string;
  questionId: string;
  isAccepted: boolean;
};

export default function AnswerItem({ id, text, questionId, isAccepted }: Props) {
  return (
    <div className="flex items-center gap-3 border-t border-atlas-white-300 bg-white p-6 first:border-t-0">
      <div className="flex-1 text-left font-semibold text-gray-900">{text}</div>

      {isAccepted ? (
        <div className="flex items-center gap-2 text-green-600 font-semibold">
          <span className="text-xl">✅</span>
          <span>Accepted</span>
        </div>
      ) : (
        <form action={markAnswerAction}>
          <input type="hidden" name="questionId" value={questionId} />
          <input type="hidden" name="answerId" value={id} />

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md border border-atlas-white-300 bg-secondary px-3 py-2 text-white hover:opacity-90"
            title="Mark as accepted answer"
            aria-label="Mark as accepted answer"
          >
            ✓
          </button>
        </form>
      )}
    </div>
  );
}
