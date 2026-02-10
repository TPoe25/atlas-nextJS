import { sql } from "@vercel/postgres";
import { Question, Topic, User } from "./definitions";

// AUTH
export async function fetchUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

// TOPICS
export async function fetchTopics(): Promise<Topic[]> {
  try {
    const data = await sql<Topic>`SELECT * FROM topics ORDER BY title ASC`;
    return data.rows;
  } catch (error) {
    console.error("Database Error (fetchTopics):", error);
    throw new Error("Failed to fetch topics.");
  }
}

export async function fetchTopic(id: string): Promise<Topic | null> {
  try {
    const data = await sql<Topic>`SELECT * FROM topics WHERE id=${id}`;
    return data.rows.length > 0 ? data.rows[0] : null;
  } catch (error) {
    console.error("Database Error (fetchTopic):", error);
    throw new Error("Failed to fetch topic.");
  }
}

// QUESTIONS
export async function fetchQuestions(topicId: string): Promise<Question[]> {
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

// WRITES
export async function insertTopic(topic: Pick<Topic, "title">): Promise<{ id: string }> {
  try {
    const data = await sql<{ id: string }>`
      INSERT INTO topics (title)
      VALUES (${topic.title})
      RETURNING id;
    `;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error (insertTopic):", error);
    throw new Error("Failed to add topic.");
  }
}

export async function insertQuestion(
  question: Pick<Question, "title" | "topic_id" | "votes">
): Promise<void> {
  try {
    await sql`
      INSERT INTO questions (title, topic_id, votes)
      VALUES (${question.title}, ${question.topic_id}, ${question.votes});
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
      WHERE id = ${questionId};
    `;
  } catch (error) {
    console.error("Database Error (incrementVotes):", error);
    throw new Error("Failed to increment votes.");
  }
}
