import { fetchTopic, fetchQuestions } from "@/lib/data";
import { askQuestionAction, voteUpAction } from "@/lib/actions";

export default async function TopicPage({
  params,
}: {
  params: { id: string };
}) {
  const topic = await fetchTopic(params.id);
  const questions = await fetchQuestions(params.id);

  if (!topic) {
    return <p>Topic not found.</p>;
  }

  return (
    <section>
      <h1>{topic.title}</h1>

      {/* Ask question */}
      <form
        action={askQuestionAction}
        style={{ display: "grid", gap: 8, maxWidth: 420 }}
      >
        <input type="hidden" name="topicId" value={params.id} />
        <input
          name="title"
          required
          placeholder="Ask a question..."
        />
        <button type="submit">Ask</button>
      </form>

      <hr style={{ margin: "24px 0" }} />

      {/* Questions list */}
      {questions.length === 0 && <p>No questions yet.</p>}

      <ul style={{ display: "grid", gap: 12 }}>
        {questions.map((q) => (
          <li key={q.id}>
            <strong>{q.title}</strong> ({q.votes})

            <form
              action={voteUpAction}
              style={{ display: "inline", marginLeft: 8 }}
            >
              <input type="hidden" name="questionId" value={q.id} />
              <input type="hidden" name="topicId" value={params.id} />
              <button type="submit">👍</button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  );
}
