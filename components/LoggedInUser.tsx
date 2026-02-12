import { auth } from "@/auth";

export default async function LoggedInUser() {
  const session = await auth();
  const user = session?.user;

  const name = user?.name ?? "Test User";
  const email = user?.email ?? "user@atlasmail.com";
  const image = user?.image;

  return (
    <div className="flex items-center gap-3 rounded-md border border-atlas-white-300 bg-white p-3">
      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm font-bold text-gray-700">
            {name.slice(0, 1).toUpperCase()}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">{name}</p>
        <p className="truncate text-xs text-gray-500">{email}</p>
      </div>
    </div>
  );
}
