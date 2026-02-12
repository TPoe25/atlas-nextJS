import AnswerItem from "@/components/AnswerItem";
import { fetchAnswers } from "@/lib/data";

type Props = {
  questionId: string;
  acceptedAnswerId: string | null;
};

export default async function AnswersList({
  questionId,
  acceptedAnswerId,
}: Props) {
  const answers = await fetchAnswers(questionId);

  const sorted = [...answers].sort((a, b) => {
    const aAccepted = acceptedAnswerId === a.id;
    const bAccepted = acceptedAnswerId === b.id;
    if (aAccepted && !bAccepted) return -1;
    if (!aAccepted && bAccepted) return 1;
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
