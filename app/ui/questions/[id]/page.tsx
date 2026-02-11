import AnswerForm from "@/components/AnswerForm";
import AnswersList from "@/components/AnswersList";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QuestionPage({ params }: Props) {
  const { id } = await params;

  const questionText = `Question ${id}`;

  return (
    <section className="p-8">
      <h1 className="mb-6 text-2xl font-extrabold text-white">
        {questionText}
      </h1>

      <AnswerForm questionId={id} />

      <div className="mt-8">
        <AnswersList questionId={id} />
      </div>
    </section>
  );
}
