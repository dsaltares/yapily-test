import Config from '@lib/config';
import detectHost from '@lib/detectHost';
import encodeBase64 from '@lib/encodeBase64';
import type { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const institutionId = req.body.institutionId as string;
  const response = await fetch(`${Config.yapily.api}/account-auth-requests`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodeBase64(`${Config.yapily.key}:${Config.yapily.secret}`)}`,
    },
    body: JSON.stringify({
      applicationUserId: Config.yapily.applicationUserId,
      institutionId,
      callback: `${detectHost(req)}/callback`,
    }),
  });
  const json = await response.json();
  res.status(200).json(json);
};

export default handler;
