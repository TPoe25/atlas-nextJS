"use client";

import { markAnswerAction } from "@/lib/actions";

type Props = {
  id: string;
  text: string;
  questionId: string;
  isAccepted: boolean;
};

export default function AnswerItem({
  id,
  text,
  questionId,
  isAccepted,
}: Props) {
  return (
    <div className="flex items-center border-l border-r border-t border-atlas-white-300 p-6 first:rounded-t-md last:rounded-b-md last:border-b">
      <div className="flex w-full items-center justify-between gap-4">
        <p className="w-full text-left font-semibold text-gray-900">{text}</p>

        <form action={markAnswerAction}>
          <input type="hidden" name="questionId" value={questionId} />
          <input type="hidden" name="answerId" value={id} />

          <button
            type="submit"
            aria-label="Mark as accepted answer"
            className={[
              "flex h-10 w-10 items-center justify-center rounded-md border",
              isAccepted
                ? "border-green-600 bg-green-600 text-white"
                : "border-atlas-white-300 bg-white text-gray-900 hover:opacity-90",
            ].join(" ")}
          >
            ✓
          </button>
        </form>
      </div>
    </div>
  );
}
