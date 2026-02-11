import Link from "next/link";

type Props = {
  id: string;
  title: string;
};

export default function TopicLink({ id, title }: Props) {
  return <Link href={`/ui/topics/${id}`}>#{title}</Link>;
}
