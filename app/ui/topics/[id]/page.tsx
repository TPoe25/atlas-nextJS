import { fetchTopic, fetchQuestions } from "@/lib/data";
import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TopicPage({ params }: Props) {
  const { id } = await params;

  const topic = await fetchTopic(id);
  const questions = await fetchQuestions(id);

  if (!topic) {
    return <p style={{ padding: 32 }}>Topic not found.</p>;
  }

  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 20 }}>
        {topic.title}
      </h1>

      {/* AskQuestion expects { topic: string } */}
      <AskQuestion topic={id} />

      <div style={{ marginTop: 24, display: "grid", gap: 12 }}>
        {questions.map((q) => (
          // Question expects { id: string, text: string, votes: number }
          <Question key={q.id} id={q.id} text={q.title} votes={q.votes} />
        ))}
      </div>
    </div>
  );
}
