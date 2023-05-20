import { ComponentProps, ElementRef, forwardRef, Ref } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { OIDCOption } from "@/api/auth/types";
import { oidcDetails } from "@/lib";

import googleSVG from "../../../public/oauth/google.svg";

interface OAuthButtonProps extends ComponentProps<typeof Button> {
  provider: OIDCOption;
}

type BtnRef = Ref<ElementRef<typeof Button>>;

const AuthButton = forwardRef((props: OAuthButtonProps, ref: BtnRef) => {
  const { provider, ...rest } = props;
  const details = oidcDetails[provider.name];

  return (
    <Link href={provider.url}>
      <Button ref={ref} {...rest} fullWidth color="neutral" variant="outlined">
        <Image alt="google" height={20} src={googleSVG} width={20} />
        <span>Continue with {details.label}</span>
      </Button>
    </Link>
  );
});

AuthButton.displayName = "OAuthButton";

export default AuthButton;
