"use client";

import { World } from "@/api/world/types";
import { WorldCard } from "@/components/features/world/index";

interface Props {
  worlds: World[];
}

export default function WorldGrid(props: Props) {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
      {props.worlds.map((world) => (
        <WorldCard key={world.id} world={world} />
      ))}
    </div>
  );
}
