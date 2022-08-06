import Config from '@lib/config';
import encodeBase64 from '@lib/encodeBase64';
import type { EndpointDefinition } from '@lib/createEndpoints';
import createEndpoints from '@lib/createEndpoints';

const getInstitutions: EndpointDefinition = {
  method: 'GET',
  handler: async () => {
    const response = await fetch(`${Config.yapily.api}/institutions`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${encodeBase64(
          `${Config.yapily.key}:${Config.yapily.secret}`
        )}`,
      },
    });
    return {
      status: 200,
      body: await response.json(),
    };
  },
};

export default createEndpoints([getInstitutions]);
