import "@/styles/globals.css";

import { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import { useUser } from "@/api/user/requests";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TailwindIndicator } from "@/components/common/tailwind-indicator";
import { Toaster } from "@/components/ui/toast";
import fetcher from "@/api/fetcher";
import { NextPageWithLayout } from "@/types/next";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function RootApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { needs_username } = useUser();

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    if (needs_username) {
      router.push("/auth/username");
    }
  }, [needs_username, router]);

  return (
    <SWRConfig value={{ fetcher }}>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        themes={["light-theme", "dark-theme"]}
      >
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
        <TailwindIndicator />
      </ThemeProvider>
    </SWRConfig>
  );
}
