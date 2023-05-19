import { getPendingWorlds, getWorlds } from "@/api/world/server";
import { WorldList } from "@/components/features/world";
import { PageProps } from "@/types/next";

export default async function IndexPage(props: PageProps) {
  const [worlds, pendingWorlds] = await Promise.all([
    getWorlds({
      search: String(props.searchParams?.search ?? ""),
    }),
    getPendingWorlds(),
  ]);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="mb-4 font-display text-header1 lg:mb-8">Worlds</h1>

      <WorldList invites={pendingWorlds} worlds={worlds} />
    </div>
  );
}
