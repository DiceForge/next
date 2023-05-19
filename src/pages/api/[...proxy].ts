import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
};

export default async function proxy(req: NextApiRequest, res: NextApiResponse) {
  try {
    const nextEncryptedToken = req.cookies["token"];
    req.headers[`Authorization`] = `Token ${nextEncryptedToken}`;
    req.headers["content-type"] = `application/json`;

    return new Promise((resolve, reject) => {
      const proxy: httpProxy = httpProxy.createProxy();
      proxy.once("proxyRes", resolve).once("error", reject).web(req, res, {
        changeOrigin: true,
        target: process.env.NEXT_PUBLIC_API_URL,
      });
    });
  } catch (err) {
    console.error({ err });
    return res
      .status(500)
      .json({ message: `Unexpected server error while proxying the request.` });
  }
}
