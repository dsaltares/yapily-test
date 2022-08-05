import Config from '@lib/config';
import encodeBase64 from '@lib/encodeBase64';
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const consent = req.headers.consent as string;
  const accountId = req.query.accountId as string;
  const response = await fetch(`${Config.yapily.api}/accounts/${accountId}/transactions`, {
    method: 'GET',
    headers: {
      Consent: consent,
      Authorization: `Basic ${encodeBase64(`${Config.yapily.key}:${Config.yapily.secret}`)}`,
    }
  });
  const json = await response.json();
  res.status(200).json(json);
};

export default handler;
