"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

import { Card } from "@/components/ui/card";
import { login } from "@/api/auth/server";
import { useToast } from "@/components/ui/toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const authenticate = useCallback(async () => {
    const code = searchParams?.get("code");

    if (!code) {
      return;
    }

    try {
      await login(code, "google");

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
  }, [router, toast, searchParams]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-[500px] p-4 text-center">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </Card>
    </div>
  );
}
