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
    alert(`Mark accepted (UI only): ${id}`);
  }

  return (
    <div className="flex items-center gap-4 border-b border-atlas-white-300 bg-atlas-navy p-6 last:border-b-0">
      <div
        className={[
          "flex h-7 w-7 items-center justify-center rounded-md",
          isAccepted
            ? "bg-green-600"
            : "bg-transparent border border-atlas-white-300",
        ].join(" ")}
        aria-label={isAccepted ? "Accepted answer" : "Answer"}
      >
        {isAccepted ? "✓" : ""}
      </div>

      <p className="flex-1 font-semibold text-black">{text}</p>

      <button
        type="button"
        onClick={markAccepted}
        className="rounded-md border border-atlas-white-300 px-3 py-2 text-black hover:opacity-90"
        title="Mark as accepted"
      >
        ✓
      </button>
    </div>
  );
}
