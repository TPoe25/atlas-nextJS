import { sql } from "@vercel/postgres";
import type { User, Topic, Question, Answer } from "./definitions";

/* ===========================
   USERS
=========================== */

export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const res = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return res.rows[0];
  } catch (error) {
    console.error("Database Error (fetchUser):", error);
    throw new Error("Failed to fetch user.");
  }
}

/* ===========================
   TOPICS
=========================== */

export async function fetchTopics(): Promise<Topic[]> {
  try {
    const res = await sql<Topic>`SELECT * FROM topics ORDER BY title`;
    return res.rows;
  } catch (error) {
    console.error("Database Error (fetchTopics):", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string): Promise<Topic | null> {
  if (!id || id === "undefined") return null;

  try {
    const res = await sql<Topic>`SELECT * FROM topics WHERE id=${id}`;
    return res.rows[0] ?? null;
  } catch (error) {
    console.error("Database Error (fetchTopic):", error);
    throw new Error("Failed to fetch topic.");
  }
}

export async function insertTopic(topic: Pick<Topic, "title">): Promise<{ id: string }> {
  try {
    const res = await sql<{ id: string }>`
      INSERT INTO topics (title)
      VALUES (${topic.title})
      RETURNING id
    `;
    return res.rows[0];
  } catch (error) {
    console.error("Database Error (insertTopic):", error);
    throw new Error("Failed to add topic.");
  }
}

/* ===========================
   QUESTIONS
=========================== */

export async function fetchQuestions(topicId: string): Promise<Question[]> {
  if (!topicId || topicId === "undefined") return [];

  try {
    const res = await sql<Question>`
      SELECT * FROM questions
      WHERE topic_id=${topicId}
      ORDER BY votes DESC
    `;
    return res.rows;
  } catch (error) {
    console.error("Database Error (fetchQuestions):", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function fetchQuestion(id: string): Promise<Question | null> {
  if (!id || id === "undefined") return null;

  try {
    const res = await sql<Question>`SELECT * FROM questions WHERE id=${id}`;
    return res.rows[0] ?? null;
  } catch (error) {
    console.error("Database Error (fetchQuestion):", error);
    throw new Error("Failed to fetch question.");
  }
}

export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id">
): Promise<void> {
  try {
    await sql`
      INSERT INTO questions (title, topic_id, votes)
      VALUES (${question.title}, ${question.topic_id}, 0)
    `;
  } catch (error) {
    console.error("Database Error (insertQuestion):", error);
    throw new Error("Failed to add question.");
  }
}

export async function incrementVotes(questionId: string): Promise<void> {
  try {
    await sql`
      UPDATE questions
      SET votes = votes + 1
      WHERE id=${questionId}
    `;
  } catch (error) {
    console.error("Database Error (incrementVotes):", error);
    throw new Error("Failed to increment votes.");
  }
}

/* ===========================
   ANSWERS
=========================== */

export async function fetchAnswers(questionId: string): Promise<Answer[]> {
  if (!questionId || questionId === "undefined") return [];

  try {
    const res = await sql<Answer>`
      SELECT * FROM answers
      WHERE question_id=${questionId}
      ORDER BY is_accepted DESC, id ASC
    `;
    return res.rows;
  } catch (error) {
    console.error("Database Error (fetchAnswers):", error);
    throw new Error("Failed to fetch answers.");
  }
}

export async function insertAnswer(text: string, questionId: string): Promise<void> {
  try {
    await sql`
      INSERT INTO answers (text, question_id)
      VALUES (${text}, ${questionId})
    `;
  } catch (error) {
    console.error("Database Error (insertAnswer):", error);
    throw new Error("Failed to insert answer.");
  }
}

export async function markAnswerAsAccepted(
  questionId: string,
  answerId: string
): Promise<void> {
  try {
    await sql`
      UPDATE answers
      SET is_accepted = false
      WHERE question_id=${questionId}
    `;

    await sql`
      UPDATE answers
      SET is_accepted = true
      WHERE id=${answerId}
    `;

    await sql`
      UPDATE questions
      SET answer_id=${answerId}
      WHERE id=${questionId}
    `;
  } catch (error) {
    console.error("Database Error (markAnswerAsAccepted):", error);
    throw new Error("Failed to mark answer.");
  }
}
