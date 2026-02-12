import { NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/data";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const topicId = params.id;
    const questions = await fetchQuestions(topicId);

    // rubric: id, title, topic_id, votes
    return NextResponse.json(
      questions.map((q) => ({
        id: q.id,
        title: q.title,
        topic_id: q.topic_id,
        votes: q.votes,
      })),
    );
  } catch (err) {
    console.error("GET /api/topics/:id/questions failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }
}
