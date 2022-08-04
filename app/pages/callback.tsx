import { useAddInstitutionConsent } from "@lib/authorization";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CallbackPage = () => {
  const addInstitutionConsent = useAddInstitutionConsent();
  const router = useRouter();

  useEffect(() => {
    const consent = router.query.consent as string;
    const applicationUserId = router.query['application-user-id'] as string;
    const userUuid = router.query['user-uuid'] as string;
    const institution = router.query.institution as string;
    addInstitutionConsent({
      consent,
      applicationUserId,
      userUuid,
      institution,
    });
    router.push(`/accounts/${institution}`);
  }, [addInstitutionConsent, router]);

  return null;
};

export default CallbackPage;
