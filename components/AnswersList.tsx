import AnswerItem from "@/components/AnswerItem.tsx";

type Answer = {
  id: string;
  text: string;
  isAccepted: boolean;
};

function getPlaceholderAnswers(questionId: string): Answer[] {
  return [
    {
      id: `${questionId}-a1`,
      text: "This is an example answer. (placeholder)",
      isAccepted: true,
    },
    {
      id: `${questionId}-a2`,
      text: "Another example answer for the list.",
      isAccepted: false,
    },
    {
      id: `${questionId}-a3`,
      text: "A third answer. Accepted should appear first.",
      isAccepted: false,
    },
  ];
}

export default async function AnswersList({
  questionId,
}: {
  questionId: string;
}) {
  const answers = getPlaceholderAnswers(questionId);
  const sorted = [...answers].sort(
    (a, b) => Number(b.isAccepted) - Number(a.isAccepted),
  );

  return (
    <div>
      <h2 className="mb-3 text-lg font-bold text-white">Answers</h2>
      <div className="overflow-hidden rounded-md border border-atlas-white-300">
        {sorted.map((a) => (
          <AnswerItem
            key={a.id}
            id={a.id}
            text={a.text}
            isAccepted={a.isAccepted}
          />
        ))}
      </div>
    </div>
  );
}
