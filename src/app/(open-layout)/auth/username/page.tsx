import { redirect } from "next/navigation";

import { Card, CardBody } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/api/user/server";

import UsernameForm from "./username-form";

export default async function Page() {
  const user = await getUser();

  if (user?.username) {
    // redirect("/");
  }

  return (
    <Card className="w-full p-4 text-center">
      <CardBody className="flex flex-col gap-4">
        <h1 className="font-display text-header5">Finish Signing Up</h1>
        <p className="text-body-regular-400 text-neutral-11">
          Create a username to continue.
        </p>

        <UsernameForm />
      </CardBody>
    </Card>
  );
}
