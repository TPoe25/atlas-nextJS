"use client";

type Props = {
  id: string;
  text: string;
  isAccepted: boolean;
};

function CheckIcon({ filled }: { filled: boolean }) {
  return (
    <span
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-2 ${
        filled ? "border-[#17C8A0] bg-[#17C8A0]" : "border-[#0B1B66] bg-white"
      }`}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M20 6L9 17l-5-5"
          stroke={filled ? "white" : "#0B1B66"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function AnswerItem({ id, text, isAccepted }: Props) {
  function markAccepted() {
    alert(`(UI only) Mark accepted: ${id}`);
  }

  return (
    <div className="flex items-center justify-between gap-6">
      <p className="text-lg font-medium text-[#0B1B66]">{text}</p>

      <button
        type="button"
        onClick={markAccepted}
        className="shrink-0"
        title="Mark as accepted"
      >
        <CheckIcon filled={isAccepted} />
      </button>
    </div>
  );
}
