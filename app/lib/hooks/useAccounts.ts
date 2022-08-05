import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { InstitutionConsent } from '@lib/authorization';
import Endpoints from '@lib/endpoints';
import QueryKeys from './queryKeys';

const useAccounts = (institutionId: string) => {
  const queryClient = useQueryClient();
  const consent = queryClient.getQueryData<InstitutionConsent>(
    QueryKeys.consents(institutionId)
  );
  return useQuery(
    QueryKeys.accounts(institutionId),
    () => fetchAccounts(consent!.consent),
    {
      enabled: !!consent,
    }
  );
};

export default useAccounts;

const fetchAccounts = async (consent: string) => {
  const response = await fetch(Endpoints.accounts, {
    headers: { consent },
  });
  const json = await response.json();
  return json.data as Account[];
};

export type Account = {
  id: string;
  type: string;
  balance: number;
  currency: string;
  accountNames: {
    name: string;
  }[];
};
