import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { InstitutionConsent } from '@lib/authorization';
import QueryKeys from './queryKeys';

const useEnsureConsent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const institutionId = router.query.institutionId as string;
  const consent = queryClient.getQueryData<InstitutionConsent>(
    QueryKeys.consents(institutionId)
  );
  useEffect(() => {
    if (!consent) {
      void router.push('/');
    }
  }, [consent, router]);
};

export default useEnsureConsent;
