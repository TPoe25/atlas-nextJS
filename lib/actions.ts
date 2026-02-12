"use server";

import { revalidatePath } from "next/cache";
import {
  insertTopic,
  insertQuestion,
  incrementVotes,
  insertAnswer,
  markAnswerAsAccepted,
} from "@/lib/data";

export async function createTopicAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  await insertTopic({ title });
  revalidatePath("/ui");
}

export async function askQuestionAction(formData: FormData) {
  const topicId = String(formData.get("topicId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!topicId || !title) return;

  await insertQuestion({ title, topic_id: topicId });
  revalidatePath(`/ui/topics/${topicId}`);
}

export async function voteUpAction(formData: FormData) {
  const questionId = String(formData.get("questionId") ?? "").trim();
  const topicId = String(formData.get("topicId") ?? "").trim();

  if (!questionId) return;

  await incrementVotes(questionId);

  if (topicId) revalidatePath(`/ui/topics/${topicId}`);
  else revalidatePath("/ui");
}

export async function addAnswerAction(formData: FormData) {
  const text = String(formData.get("text") ?? "").trim();
  const questionId = String(formData.get("questionId") ?? "").trim();
  if (!text || !questionId) return;

  await insertAnswer(text, questionId);
  revalidatePath(`/ui/questions/${questionId}`);
}

export async function markAnswerAction(formData: FormData) {
  const questionId = String(formData.get("questionId") ?? "").trim();
  const answerId = String(formData.get("answerId") ?? "").trim();
  if (!questionId || !answerId) return;

  await markAnswerAsAccepted(questionId, answerId);
  revalidatePath(`/ui/questions/${questionId}`);
}
