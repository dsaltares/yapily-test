import type { EndpointDefinition } from '@lib/createEndpoints';
import createEndpoints from '@lib/createEndpoints';

const getConsents: EndpointDefinition = {
  method: 'GET',
  handler: async (req) => {
    // TODO - this should validate if the consents are still valid
    const consents = req.cookies.consent ? JSON.parse(req.cookies.consent) : {};
    return {
      status: 200,
      body: { consents },
    };
  },
};

export default createEndpoints([getConsents]);
