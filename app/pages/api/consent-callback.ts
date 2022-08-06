import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import detectHost from '@lib/detectHost';
import type { InstitutionConsent } from '@lib/types';

const setConsentCookie = (
  req: NextApiRequest,
  res: NextApiResponse,
  consent: InstitutionConsent
) => {
  const cookie = req.cookies.consent ? JSON.parse(req.cookies.consent) : {};
  cookie[consent.institution] = consent;

  res.setHeader(
    'Set-Cookie',
    serialize('consent', JSON.stringify(cookie), {
      maxAge: 1000 * 60 * 60 * 24,
    })
  );
};

const handler: NextApiHandler = async (req, res) => {
  const consent = req.query.consent as string;
  const applicationUserId = req.query['application-user-id'] as string;
  const userUuid = req.query['user-uuid'] as string;
  const institution = req.query.institution as string;

  if (consent && applicationUserId && userUuid && institution) {
    setConsentCookie(req, res, {
      consent,
      applicationUserId,
      userUuid,
      institution,
    });
    res.redirect(`${detectHost(req)}/${institution}`).end();
  } else {
    res.redirect(`${detectHost(req)}/`).end();
  }
};

export default handler;
