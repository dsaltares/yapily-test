import Config from '@lib/config';
import detectHost from '@lib/detectHost';
import encodeBase64 from '@lib/encodeBase64';
import createEndpoints, { type EndpointDefinition } from '@lib/createEndpoints';

const getAccountAuthorization: EndpointDefinition = {
  method: 'POST',
  handler: async (req) => {
    const institutionId = req.body.institutionId as string;
    const response = await fetch(`${Config.yapily.api}/account-auth-requests`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodeBase64(
          `${Config.yapily.key}:${Config.yapily.secret}`
        )}`,
      },
      body: JSON.stringify({
        applicationUserId: Config.yapily.applicationUserId,
        institutionId,
        callback: `${detectHost(req)}/api/consent-callback`,
      }),
    });
    const json = await response.json();
    return {
      status: 200,
      body: json,
    };
  },
};

export default createEndpoints([getAccountAuthorization]);
