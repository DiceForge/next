"use client";

import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildQueryParams } from "@/api/utils";
import CreateWorldDialog from "@/components/feature/world/create-world-dialog";

export default function WorldSearch() {
  const router = useRouter();

  const onSearch = (search: string) => {
    router.replace(`/${buildQueryParams({ search })}`);
  };

  return (
    <div className="flex justify-end gap-4">
      <Input
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search..."
        startIcon="Search"
      />

      <CreateWorldDialog>
        <Button>
          <PlusIcon size={20} />
          <span className="hidden md:inline-block">Create World</span>
        </Button>
      </CreateWorldDialog>
    </div>
  );
}
