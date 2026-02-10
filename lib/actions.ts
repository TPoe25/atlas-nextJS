"use server";

import { revalidatePath } from "next/cache";
import { insertTopic, insertQuestion, incrementVotes } from "@/lib/data";

export async function createTopicAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  await insertTopic({ title });

  // refresh sidebar + /ui list
  revalidatePath("/ui");
}

export async function askQuestionAction(formData: FormData) {
  const topicId = String(formData.get("topicId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (!topicId || !title) return;

  await insertQuestion({ title, topic_id: topicId, votes: 0 });

  // refresh the topic page
  revalidatePath(`/ui/topics/${topicId}`);
}

export async function voteUpAction(formData: FormData) {
  const questionId = String(formData.get("questionId") ?? "").trim();
  const topicId = String(formData.get("topicId") ?? "").trim(); // optional but best for precise revalidate
  if (!questionId) return;

  await incrementVotes(questionId);

  // revalidate the page you’re on (if topicId provided), otherwise refresh /ui
  if (topicId) revalidatePath(`/ui/topics/${topicId}`);
  else revalidatePath("/ui");
}
