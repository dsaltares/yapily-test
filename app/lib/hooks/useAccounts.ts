import { useQuery } from '@tanstack/react-query';
import Endpoints from '@lib/endpoints';
import QueryKeys from './queryKeys';
import useSyncConsent from './useSyncConsent';

const useAccounts = (institutionId: string) => {
  const consent = useSyncConsent(institutionId);
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
