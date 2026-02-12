import { fetchTopic, fetchQuestions } from "@/lib/data";
import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TopicPage({ params }: Props) {
  const { id: topicId } = await params;

  const topic = await fetchTopic(topicId);
  const questions = await fetchQuestions(topicId);

  if (!topic) {
    return <p className="p-8">Topic not found.</p>;
  }

  return (
    <section className="p-8">
      <h1 className="mb-6 text-4xl font-extrabold">{topic.title}</h1>

      <AskQuestion topicId={topicId} />

      <div className="mt-8 overflow-hidden rounded-md border border-atlas-white-300">
        {questions.map((q) => (
          <Question
            key={q.id}
            id={q.id}
            text={q.title}
            votes={q.votes}
            topicId={topicId}
          />
        ))}
      </div>
    </section>
  );
}
