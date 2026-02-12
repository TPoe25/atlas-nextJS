import { fetchQuestion } from "@/lib/data";
import AnswerForm from "@/components/AnswerForm";
import AnswersList from "@/components/AnswersList";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QuestionPage({ params }: Props) {
  const { id } = await params;

  const question = await fetchQuestion(id);
  if (!question) {
    return <p className="p-8">Question not found.</p>;
  }

  return (
    <section className="p-8">
      <h1 className="mb-6 text-4xl font-extrabold">{question.title}</h1>

      <AnswerForm questionId={id} />

      <div className="mt-8">
        <AnswersList
          questionId={id}
          acceptedAnswerId={question.answer_id ?? null}
        />
      </div>
    </section>
  );
}
