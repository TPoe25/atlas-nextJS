"use server";

import { revalidatePath } from "next/cache";
import {
  insertAnswer,
  markAnswerAsAccepted,
  insertTopic,
  insertQuestion,
  incrementVotes,
} from "@/lib/data";

/* ===========================
   TOPICS
=========================== */

export async function createTopicAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  await insertTopic({ title });
  revalidatePath("/ui");
}

/* ===========================
   QUESTIONS
=========================== */

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

/* ===========================
   ANSWERS
=========================== */

export async function addAnswerAction(formData: FormData) {
  const text = formData.get("text") as string;
  const questionId = formData.get("questionId") as string;

  if (!text || !questionId) return;

  await insertAnswer(text, questionId);
  revalidatePath(`/ui/questions/${questionId}`);
}

export async function markAcceptedAction(formData: FormData) {
  const questionId = formData.get("questionId") as string;
  const answerId = formData.get("answerId") as string;

  if (!questionId || !answerId) return;

  await markAnswerAsAccepted(questionId, answerId);
  revalidatePath(`/ui/questions/${questionId}`);
}
