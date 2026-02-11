"use client";

export default function AnswerItem({
  id,
  text,
  isAccepted,
}: {
  id: string;
  text: string;
  isAccepted: boolean;
}) {
  function markAccepted() {
    // UI-only for Task 1 — no DB call yet
    alert(`(UI only) Mark accepted answer: ${id}`);
  }

  return (
    <div className="flex items-center gap-3 border-b border-atlas-white-300 bg-secondary p-4 last:border-b-0">
      {/* accepted badge */}
      <div className="w-10 text-center">
        {isAccepted ? (
          <span
            title="Accepted"
            className="inline-flex items-center justify-center rounded-md bg-green-600 px-2 py-1 text-sm font-bold text-white"
          >
            ✓
          </span>
        ) : (
          <span className="text-white/50"> </span>
        )}
      </div>

      <p className="flex-1 font-semibold text-white">{text}</p>

      <button
        type="button"
        onClick={markAccepted}
        className="rounded-md border border-atlas-white-300 px-3 py-2 text-white hover:opacity-90"
        title="Mark as accepted"
      >
        ✓
      </button>
    </div>
  );
}
