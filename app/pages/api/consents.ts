import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const consents = req.cookies.consent ? JSON.parse(req.cookies.consent) : {};
  // TODO - this should validate if the consents are still valid
  return res.status(200).json({ consents });
};

export default handler;
