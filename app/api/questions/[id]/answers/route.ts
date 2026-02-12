import { NextResponse } from "next/server";
import { fetchAnswers } from "@/lib/data";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { id } = await params; // question id
  const answers = await fetchAnswers(id);

  return NextResponse.json(
    answers.map((a) => ({
      id: a.id,
      answer: a.text,
      question_id: a.question_id,
    })),
  );
}
