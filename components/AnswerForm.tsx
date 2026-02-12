import { fetchQuestion, fetchAnswers } from "@/lib/data";
import AnswerForm from "@/components/AnswerForm";
import AnswerItem from "@/components/AnswerItem";

type Props = {
  params: { id: string };
};

export default async function QuestionPage({ params }: Props) {
  const { id } = params;

  const question = await fetchQuestion(id);
  if (!question) return <p className="p-8">Question not found.</p>;

  const answers = await fetchAnswers(id);

  const sortedAnswers = [...answers].sort((a, b) => {
    if (a.is_accepted && !b.is_accepted) return -1;
    if (!a.is_accepted && b.is_accepted) return 1;
    return 0;
  });

  return (
    <section className="p-8">
      <h1 className="mb-6 text-4xl font-extrabold text-white">
        {question.title}
      </h1>

      <AnswerForm questionId={id} />

      <div className="mt-8 overflow-hidden rounded-md border border-atlas-white-300">
        {sortedAnswers.map((a) => (
          <AnswerItem
            key={a.id}
            id={a.id}
            text={a.text}
            isAccepted={a.is_accepted}
          />
        ))}
      </div>
    </section>
  );
}
