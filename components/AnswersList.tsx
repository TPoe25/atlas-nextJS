import { fetchAnswers } from "@/lib/data";
import AnswerItem from "@/components/AnswerItem";

export default async function AnswersList({
  questionId,
  acceptedAnswerId,
}: {
  questionId: string;
  acceptedAnswerId: string | null;
}) {
  const answers = await fetchAnswers(questionId);

  const sorted = [...answers].sort((a, b) => {
    if (acceptedAnswerId && a.id === acceptedAnswerId) return -1;
    if (acceptedAnswerId && b.id === acceptedAnswerId) return 1;
    return 0;
  });

  return (
    <div className="overflow-hidden rounded-md border border-atlas-white-300">
      {sorted.map((a) => (
        <AnswerItem
          key={a.id}
          id={a.id}
          text={a.text}
          questionId={questionId}
          isAccepted={acceptedAnswerId === a.id}
        />
      ))}
    </div>
  );
}
