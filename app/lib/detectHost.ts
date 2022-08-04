import { NextApiRequest } from "next";

const detectHost = (req: NextApiRequest) => {
  const forwardedHost = req.headers["x-forwarded-host"] ?? req.headers.host;
  if (process.env.VERCEL) return `https://${forwardedHost}`;
  return process.env.HOST ?? 'http://localhost:3000';
};

export default detectHost;
