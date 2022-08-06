import { serialize } from 'cookie';
import type { NextApiRequest } from 'next';
import detectHost from '@lib/detectHost';
import type { InstitutionConsent } from '@lib/types';
import createEndpoints, { type EndpointDefinition } from '@lib/createEndpoints';

const getConsentCallback: EndpointDefinition = {
  method: 'GET',
  handler: async (req) => {
    const consent = req.query.consent as string;
    const applicationUserId = req.query['application-user-id'] as string;
    const userUuid = req.query['user-uuid'] as string;
    const institution = req.query.institution as string;
    const host = detectHost(req);

    let redirect = `${host}/`;
    const headers: Record<string, string> = {};

    if (consent && applicationUserId && userUuid && institution) {
      headers['Set-Cookie'] = serialize(
        'consent',
        JSON.stringify(
          getConsentCookie(req, {
            consent,
            institution,
            applicationUserId,
            userUuid,
          })
        )
      );
      redirect = `${host}/${institution}`;
    }

    return {
      redirect,
      headers,
    };
  },
};

export default createEndpoints([getConsentCallback]);

const getConsentCookie = (req: NextApiRequest, consent: InstitutionConsent) => {
  const cookie = req.cookies.consent ? JSON.parse(req.cookies.consent) : {};
  cookie[consent.institution] = consent;
  return cookie;
};
