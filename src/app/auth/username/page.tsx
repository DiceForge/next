import { redirect } from "next/navigation";

import { Card, CardBody } from "@/components/ui/card";
import { getUser } from "@/api/user/server";

import UsernameForm from "./username-form";

export default async function Page() {
  const user = await getUser();

  if (user?.username) {
    redirect("/");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-[480px] p-4 text-center">
        <CardBody className="flex flex-col gap-4">
          <h1 className="font-display text-header5">Finish Signing Up</h1>
          <p className="text-body-regular-400 text-neutral-11">
            Create a username to continue.
          </p>

          <UsernameForm />
        </CardBody>
      </Card>
    </div>
  );
}
