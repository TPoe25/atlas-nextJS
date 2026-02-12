import AnswerItem from "./AnswerItem";

type Answer = {
  id: string;
  text: string;
};

type Props = {
  questionId: string;
  acceptedAnswerId: string | null;
};

function getPlaceholderAnswers(questionId: string): Answer[] {
  return [
    {
      id: `${questionId}-a1`,
      text: "Null safety in TypeScript refers to the language’s ability to prevent runtime errors caused by null and undefined values.",
    },
    {
      id: `${questionId}-a2`,
      text: "It's a new feature in TypeScript that makes it easier to write type-safe code.",
    },
    {
      id: `${questionId}-a3`,
      text: "It helps developers write safer and more predictable code, reducing unexpected null and undefined errors",
    },
  ];
}

export default function AnswersList({ questionId, acceptedAnswerId }: Props) {
  const answers = getPlaceholderAnswers(questionId);

  const sorted = [...answers].sort((a, b) => {
    if (!acceptedAnswerId) return 0;
    if (a.id === acceptedAnswerId) return -1;
    if (b.id === acceptedAnswerId) return 1;
    return 0;
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
      {sorted.map((a, idx) => (
        <div
          key={a.id}
          className={`${
            idx === 0 ? "" : "border-t border-[#E5E7EB]"
          } px-6 py-6`}
        >
          <AnswerItem
            id={a.id}
            text={a.text}
            isAccepted={acceptedAnswerId === a.id}
          />
        </div>
      ))}
    </div>
  );
}
