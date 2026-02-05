// Define your server actions here
"use server";

import { revalidatePath } from "next/cache";
import { createTopic, createQuestion, voteUp } from "@/lib/data";

export async function createTopicAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  await createTopic(name);
  revalidatePath("/ui");
}

export async function askQuestionAction(formData: FormData) {
  const topicId = String(formData.get("topicId") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!topicId || !body) return;

  await createQuestion(topicId, body);
  revalidatePath(`/ui/topics/${topicId}`);
}

export async function voteUpAction(formData: FormData) {
  const questionId = String(formData.get("questionId") ?? "").trim();
  if (!questionId) return;

  await voteUp(questionId);
  revalidatePath("/ui");
}
