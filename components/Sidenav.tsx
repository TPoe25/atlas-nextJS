import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import TopicLinks from "./TopicLinks";
import NavLink from "./NavLink";
import SignOutButton from "./SignOutButton";
import NewTopicButton from "./NewTopicButton";
import LoggedInUser from "./LoggedInUser";

export default async function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Logo />

      <div className="px-2">
        <LoggedInUser />
      </div>

      <div className="mt-2 flex grow flex-row justify-between space-x-2 overflow-auto md:flex-col md:space-x-0 md:space-y-2">
        <NavLink name="Topics" href="/ui" />
        <TopicLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block" />
        <NewTopicButton />
        <SignOutButton />
      </div>
    </div>
  );
}

function Logo() {
  return (
    <Link
      className="mb-2 flex h-20 items-end justify-center rounded-md bg-secondary p-4 md:h-40"
      href="/ui"
    >
      <Image
        src={logo}
        alt="Acme Logo"
        className="h-14 object-contain md:h-full"
      />
    </Link>
  );
}
