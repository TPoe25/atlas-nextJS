import { fetchQuestion, fetchAnswers } from "@/lib/data";
import AnswerForm from "@/components/AnswerForm";
import AnswersList from "@/components/AnswersList";

type Props = { params: { id: string } };

export default async function QuestionPage({ params }: Props) {
  const question = await fetchQuestion(params.id);
  if (!question) return <p className="p-8">Question not found.</p>;

  const answers = await fetchAnswers(params.id);

  return (
    <section className="p-8">
      <h1 className="mb-6 text-2xl font-extrabold text-white">
        {question.title}
      </h1>

      <AnswerForm questionId={params.id} />

      <div className="mt-8">
        <AnswersList answers={answers} acceptedAnswerId={question.answer_id} />
      </div>
    </section>
  );
}
