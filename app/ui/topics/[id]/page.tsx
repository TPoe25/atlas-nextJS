export default function TopicPage({ params }: { params: { id: string } }) {
  return (
    <section>
      <h1>Topic: {params.id}</h1>
      <p>Questions will be displayed here in Task 3.</p>
    </section>
  );
}
