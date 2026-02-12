"use client";

import { markAcceptedAction } from "@/lib/actions";

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
    <div className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-3">
        {isAccepted && <span className="text-green-600 text-xl">✔</span>}
        <p>{text}</p>
      </div>

      <form action={markAcceptedAction}>
        <input type="hidden" name="questionId" value={questionId} />
        <input type="hidden" name="answerId" value={id} />

        <button
          type="submit"
          className="rounded-md border px-3 py-1 text-sm"
        >
          ✔
        </button>
      </form>
    </div>
  );
}
