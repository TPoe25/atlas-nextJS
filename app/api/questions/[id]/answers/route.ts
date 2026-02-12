import { NextResponse } from "next/server";
import { fetchQuestions } from "@/lib/data";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params; // topic id
  const questions = await fetchQuestions(id);

  return NextResponse.json(
    questions.map((q) => ({
      id: q.id,
      title: q.title,
      topic_id: q.topic_id,
      votes: q.votes,
    })),
  );
}
