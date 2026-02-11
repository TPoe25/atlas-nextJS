import { sql } from "@vercel/postgres";
import { Question, Topic, User } from "./definitions";

/* ===========================
   USERS
=========================== */

export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
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
    const data = await sql<Topic>`SELECT * FROM topics ORDER BY title`;
    return data.rows;
  } catch (error) {
    console.error("Database Error (fetchTopics):", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string): Promise<Topic | null> {
  if (!id || id === "undefined") return null;

  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id=${id}`;
    return data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error (fetchTopic):", error);
    throw new Error("Failed to fetch topic.");
  }
}

export async function insertTopic(
  topic: Pick<Topic, "title">,
): Promise<{ id: string }> {
  try {
    const data = await sql<Topic>`
        INSERT INTO topics (title)
        VALUES (${topic.title})
        RETURNING id
      `;
    return data.rows[0];
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
    const data = await sql<Question>`
        SELECT * FROM questions
        WHERE topic_id=${topicId}
        ORDER BY votes DESC
      `;
    return data.rows;
  } catch (error) {
    console.error("Database Error (fetchQuestions):", error);
    throw new Error("Failed to fetch questions.");
  }
}

export async function fetchQuestion(id: string): Promise<Question | null> {
  if (!id || id === "undefined") return null;

  try {
    const data = await sql<Question>`
        SELECT * FROM questions
        WHERE id=${id}
      `;
    return data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error (fetchQuestion):", error);
    throw new Error("Failed to fetch question.");
  }
}

export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id">,
) {
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

export async function incrementVotes(id: string) {
  try {
    await sql`
      UPDATE questions
      SET votes = votes + 1
      WHERE id=${id}
    `;
  } catch (error) {
    console.error("Database Error (incrementVotes):", error);
    throw new Error("Failed to increment votes.");
  }
}

/* ===========================
   ANSWERS (Part 2)
=========================== */

export type Answer = {
  id: string;
  text: string;
  question_id: string;
  is_accepted: boolean;
};

export async function fetchAnswers(questionId: string): Promise<Answer[]> {
  if (!questionId || questionId === "undefined") return [];

  try {
    const data = await sql<Answer>`
        SELECT * FROM answers
        WHERE question_id=${questionId}
      `;
    return data.rows;
  } catch (error) {
    console.error("Database Error (fetchAnswers):", error);
    throw new Error("Failed to fetch answers.");
  }
}
