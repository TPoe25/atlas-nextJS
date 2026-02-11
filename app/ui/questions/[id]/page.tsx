import AnswerForm from "@/components/AnswerForm";
import ItemsList from "@/components/AnswersList";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function QuestionPage({ params }: Props) {
  const { id } = await params;

  // Task 1 (UI-only): placeholder question text
  const questionText = "What is null safety in TypeScript?";

  return (
    <section className="w-full">
      <h1 className="mb-6 text-4xl font-extrabold text-black">
        {questionText}
      </h1>

      <AnswerForm questionId={id} />

      <div className="mt-8">
        <ItemsList questionId={id} />
      </div>
    </section>
  );
}
