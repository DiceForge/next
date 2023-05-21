import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { login } from "@/api/auth/requests";
import { useToast } from "@/components/ui/toast";
import { CardSkeleton } from "@/components/ui/skeleton";
import { useUser } from "@/api/user/requests";
import { Button } from "@/components/ui/button";

export default function GoogleCallback() {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateUser } = useUser();
  const [tryAgainVisible, setTryAgainVisible] = useState(false);

  const authenticate = useCallback(async () => {
    const code = router.query.code;

    if (!code) {
      return;
    }

    try {
      const res = await login(String(code), "google");

      localStorage.setItem("token", res.data.token);

      await mutateUser();

      toast({
        title: "Welcome!",
        description: "You have been successfully signed in.",
      });
    } catch (e) {
      toast({
        title: "Uh oh!",
        description: "Something went wrong while signing you in.",
        variant: "destructive",
      });
    } finally {
      router.push("/");
    }
  }, [mutateUser, router, toast]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  useEffect(() => {
    const timer = setTimeout(() => setTryAgainVisible(true), 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <CardSkeleton />

      {tryAgainVisible && (
        <div className="flex items-center gap-4">
          <span className="text-neutral-11">Having trouble?</span>
          <Link href="/auth/sign-in">
            <Button size="small" variant="text">
              Try Again
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
