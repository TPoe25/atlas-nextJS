import { AskQuestion } from "@/components/AskQuestion";
import { Question } from "@/components/Question";
import { fetchQuestions, fetchTopic } from "@/lib/data";

type TopicPageProps = {
  params: { id: string };
};

export default async function TopicPage({ params }: TopicPageProps) {
  const { id } = params;
  const topic = await fetchTopic(id);
  const questions = await fetchQuestions(id);

  if (!topic) {
    return (
      <section>
        <h1 className="text-3xl font-bold text-secondary">Topic not found</h1>
        <p className="mt-4 text-muted-foreground">
          We could not find a topic with that ID.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="mb-6 text-3xl font-bold text-secondary">{topic.title}</h1>
      <AskQuestion topic={topic.title} />
      {questions.length === 0 ? (
        <p className="text-muted-foreground">
          No questions yet. Ask the first question for this topic.
        </p>
      ) : (
        <div>
          {questions.map((question) => (
            <Question
              key={question.id}
              id={question.id}
              text={question.title}
              votes={question.votes}
            />
          ))}
        </div>
      )}
    </section>
  );
}
