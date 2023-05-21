import { NextPageWithLayout } from "@/types/next";
import { Card, CardBody } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AuthButton from "@/components/common/auth-button";
import { useProviders } from "@/api/auth/requests";
import OpenLayout from "@/components/layout/open-layout";
import { ContentSkeleton } from "@/components/ui/skeleton";

const Page: NextPageWithLayout = () => {
  const { providers, isLoading } = useProviders();

  return (
    <div className="mx-auto mt-10 box-border flex w-full max-w-[480px] flex-col items-center">
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

          {isLoading && <ContentSkeleton />}
        </CardBody>
      </Card>
    </div>
  );
};

Page.getLayout = OpenLayout;

export default Page;
