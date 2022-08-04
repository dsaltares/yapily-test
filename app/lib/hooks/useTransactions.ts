import { InstitutionConsent } from "@lib/authorization";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QueryKeys from "./queryKeys";

const useTransactions = (institutionId: string, accountId: string) => {
  const queryClient = useQueryClient();
  const consent = queryClient.getQueryData<InstitutionConsent>(QueryKeys.consents(institutionId));
  return useQuery(
    QueryKeys.accounts(institutionId),
    () => fetchTransactions({ accountId, consent: consent!.consent }), {
      enabled: !!consent,
    }
  );
};

export default useTransactions;

type FetchTransactionsParams = {
  accountId: string;
  consent: string;
};

const fetchTransactions = async ({ accountId, consent }: FetchTransactionsParams) => {
  const response = await fetch(`/api/transactions/${accountId}`, {
    headers: { consent }
  });
  const json = await response.json();
  return json.data as Transaction[]
}

type Transaction = {
  id: string;
  date: string;
  status: 'BOOKED' | 'PENDING';
  amount: number;
  currency: string;
  description: string;
  balance: {
    type: 'CLOSING_AVAILABLE' | 'CLOSING_BOOKED' | 'EXPECTED' | 'CLOSING_CLEARED' | 'FORWARD_AVAILABLE';
    balanceAmount: {
      amount: number;
      currency: string;
    }
  },
}
