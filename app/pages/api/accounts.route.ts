import Config from '@lib/config';
import encodeBase64 from '@lib/encodeBase64';
import createEndpoints, { type EndpointDefinition } from '@lib/createEndpoints';

const getAccounts: EndpointDefinition = {
  method: 'GET',
  handler: async (req) => {
    const consent = req.headers.consent as string;
    const response = await fetch(`${Config.yapily.api}/accounts`, {
      method: 'GET',
      headers: {
        Consent: consent,
        Authorization: `Basic ${encodeBase64(
          `${Config.yapily.key}:${Config.yapily.secret}`
        )}`,
      },
    });
    const json = await response.json();
    return {
      status: 200,
      body: json,
    };
  },
};

export default createEndpoints([getAccounts]);
