import QueryKeys from "@lib/hooks/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CallbackPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const consent = router.query.consent as string;
    const applicationUserId = router.query['application-user-id'] as string;
    const userUuid = router.query['user-uuid'] as string;
    const institution = router.query.institution as string;

    if (consent && applicationUserId && userUuid && institution) {
      queryClient.setQueryData(QueryKeys.consents(institution), {
        consent,
        applicationUserId,
        userUuid,
        institution,
      });
      router.push(`/${institution}/accounts`);
    }

  }, [queryClient, router]);

  return null;
};

export default CallbackPage;
