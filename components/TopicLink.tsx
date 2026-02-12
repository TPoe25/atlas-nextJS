import Link from "next/link";

type Props = {
  id: string;
  title: string;
};

function HashIcon() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-2xl font-black text-black">
      #
    </span>
  );
}

export default function TopicLink({ id, title }: Props) {
  return (
    <Link
      href={`/ui/topics/${id}`}
      className="flex items-center gap-4 rounded-2xl bg-[#F7F8FA] px-5 py-4 text-lg font-semibold text-black hover:opacity-90"
    >
      <HashIcon />
      <span>{title}</span>
    </Link>
  );
}
