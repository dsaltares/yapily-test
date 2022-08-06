import { useQueryClient } from '@tanstack/react-query';
import type { InstitutionConsent } from '@lib/types';
import QueryKeys from './queryKeys';

const useSyncConsent = (institutionId: string) => {
  const queryClient = useQueryClient();
  const consents = queryClient.getQueryData<Record<string, InstitutionConsent>>(
    QueryKeys.consents()
  );
  return consents && consents[institutionId];
};

export default useSyncConsent;
