import Config from '@lib/config';
import encodeBase64 from '@lib/encodeBase64';
import createEndpoints, { type EndpointDefinition } from '@lib/createEndpoints';

const getTransactions: EndpointDefinition = {
  method: 'GET',
  handler: async (req) => {
    const consent = req.headers.consent as string;
    const accountId = req.query.accountId as string;
    const from = req.query.from as string;
    const before = req.query.before as string;
    const query = new URLSearchParams();
    if (from) {
      query.set('from', from);
    }
    if (before) {
      query.set('before', before);
    }
    const response = await fetch(
      `${
        Config.yapily.api
      }/accounts/${accountId}/transactions?${query.toString()}`,
      {
        method: 'GET',
        headers: {
          Consent: consent,
          Authorization: `Basic ${encodeBase64(
            `${Config.yapily.key}:${Config.yapily.secret}`
          )}`,
        },
      }
    );
    const json = await response.json();
    return {
      status: 200,
      body: json,
    };
  },
};

export default createEndpoints([getTransactions]);
