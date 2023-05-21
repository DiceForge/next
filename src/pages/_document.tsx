import NextDocument, { Head, Html, Main, NextScript } from "next/document";

import { cn } from "@/lib/utils";
import { inter, poppins } from "@/lib/fonts";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta content="Forge your own D&D campaigns!" name="description" />
        </Head>

        <body className={cn([inter.variable, poppins.variable])}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
