import { createTopicAction } from "@/lib/actions";

export default function NewTopicPage() {
  return (
    <section>
      <h1>New Topic</h1>

      <form
        action={createTopicAction}
        style={{ display: "grid", gap: 10, maxWidth: 420 }}
      >
        <label>
          Topic name
          <input
            name="name"
            required
            placeholder="e.g. Next.js Routing"
            style={{ width: "100%" }}
          />
        </label>

        <button type="submit">Create</button>
      </form>
    </section>
  );
}
