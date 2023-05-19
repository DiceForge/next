"use client";

import { ComponentProps, ElementRef, forwardRef, Ref } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { OIDCOption } from "@/api/auth/types";
import { oidcDetails } from "@/lib";

import googleSVG from "../../../public/oauth/google.svg";

interface OAuthButtonProps extends ComponentProps<typeof Button> {
  provider: OIDCOption;
}

type BtnRef = Ref<ElementRef<typeof Button>>;

const AuthButton = forwardRef((props: OAuthButtonProps, ref: BtnRef) => {
  const router = useRouter();
  const { provider, ...rest } = props;
  const details = oidcDetails[provider.name];

  const handleClick = () => {
    router.push(provider.url);
  };

  return (
    <Button
      ref={ref}
      {...rest}
      color="neutral"
      onClick={handleClick}
      variant="outlined"
    >
      <Image alt="google" height={20} src={googleSVG} width={20} />
      <span>Continue with {details.label}</span>
    </Button>
  );
});

AuthButton.displayName = "OAuthButton";

export default AuthButton;
