"use client";

import { voteUpAction } from "@/lib/actions";

export default function VoteButton({
  id,
  topicId,
}: {
  id: string;
  topicId: string;
}) {
  return (
    <form action={voteUpAction}>
      <input type="hidden" name="questionId" value={id} />
      <input type="hidden" name="topicId" value={topicId} />

      <button type="submit" className="ml-2 hover:opacity-90">
        👍
      </button>
    </form>
  );
}
