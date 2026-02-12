import { fetchQuestion, fetchAnswers } from "@/lib/data";
import AnswerForm from "@/components/AnswerForm";
import AnswerItem from "@/components/AnswerItem";

type Props = {
  params: { id: string };
};

export default async function QuestionPage({ params }: Props) {
  const { id } = params;

  const question = await fetchQuestion(id);

  if (!question) {
    return <p className="p-8">Question not found.</p>;
  }

  const answers = await fetchAnswers(id);

  const sortedAnswers = [...answers].sort((a) =>
    a.is_accepted ? -1 : 1
  );

  return (
    <section className="p-8">
      <h1 className="mb-6 text-4xl font-extrabold">
        {question.title}
      </h1>

      <AnswerForm questionId={id} />

      <div className="mt-8 overflow-hidden rounded-md border border-gray-200">
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
