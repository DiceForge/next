import { getWorlds } from "@/api/world/actions";

export default async function Page() {
  const worlds = await getWorlds();

  console.log(worlds);

  return (
    <div className="grid grid-cols-3 gap-8">
      {worlds.map((world) => (
        <p>{world.name}</p>
      ))}
    </div>
  );
}
