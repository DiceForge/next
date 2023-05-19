"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { type InferType, object, string } from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { usernameRegex } from "@/lib";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { finalizeUsername } from "@/api/auth/server";
import { useToast } from "@/components/ui/toast";

const schema = object().shape({
  username: string()
    .required("Username is required")
    .matches(
      usernameRegex,
      "Please use only letters, numbers, periods, underscores, or dashes."
    ),
});

type UsernameForm = InferType<typeof schema>;

export default function UsernameForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { register, formState, handleSubmit } = useForm<UsernameForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
    },
  });

  const onSetUsername = async (data: UsernameForm) => {
    setLoading(true);

    try {
      await finalizeUsername(data.username);

      toast({
        title: "Welcome to DiceForge!",
        description: "You have successfully set your username!",
      });

      router.refresh();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "There was a problem setting your username.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 text-left"
      onSubmit={handleSubmit(onSetUsername)}
    >
      <Input
        className="flex-1"
        errorText={formState.errors.username?.message}
        helpText="This will be publicly available, unlike your email"
        label="Username"
        placeholder="strahd.zarowich"
        status={formState.errors.username ? "error" : "default"}
        {...register("username")}
      />

      <div className="flex justify-end">
        <Button loading={loading}>Set Username</Button>
      </div>
    </form>
  );
}
