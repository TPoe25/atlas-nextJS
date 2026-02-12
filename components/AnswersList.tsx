import AnswerItem from "./AnswerItem";
import { fetchAnswers, fetchQuestion } from "@/lib/data";

export default async function AnswersList({
  questionId,
}: {
  questionId: string;
}) {
  const answers = await fetchAnswers(questionId);
  const question = await fetchQuestion(questionId);

  const acceptedId = question?.answer_id ?? null;

  const sorted = [...answers].sort((a) => {
    if (a.id === acceptedId) return -1;
    return 0;
  });

  return (
    <div className="rounded-md border">
      {sorted.map((a) => (
        <AnswerItem
          key={a.id}
          id={a.id}
          text={a.text}
          questionId={questionId}
          isAccepted={a.id === acceptedId}
        />
      ))}
    </div>
  );
}
