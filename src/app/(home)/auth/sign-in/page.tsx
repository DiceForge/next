import { getProviders } from "@/api/auth/actions";
import AuthButton from "@/components/common/auth-button";
import { Card, CardBody } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <Card className="w-full p-4 text-center">
      <CardBody className="flex flex-col gap-4">
        <h1 className="font-display text-header5">Welcome to DiceForge</h1>
        <p className="text-body-regular-400 text-neutral-11">
          Sign in or create a new account.
        </p>

        <Separator className="m-auto w-1/3" />

        {providers &&
          providers.map((provider) => (
            <AuthButton key={provider.name} provider={provider} />
          ))}
      </CardBody>
    </Card>
  );
}
