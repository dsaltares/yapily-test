import { InstitutionConsent } from "@lib/authorization";
import Endpoints from "@lib/endpoints";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QueryKeys from "./queryKeys";

type UseTransactionsParams = {
  institutionId: string;
  accountId: string;
  from: string;
  before: string;
};

const useTransactions = ({ institutionId, accountId, from, before }: UseTransactionsParams) => {
  const queryClient = useQueryClient();
  const consent = queryClient.getQueryData<InstitutionConsent>(QueryKeys.consents(institutionId));
  return useQuery(
    QueryKeys.transactions(institutionId, accountId, from, before),
    () => fetchTransactions({ accountId, consent: consent!.consent, from, before }), {
      enabled: !!consent,
    }
  );
};

export default useTransactions;

type FetchTransactionsParams = {
  accountId: string;
  consent: string;
  from: string;
  before: string;
};

const fetchTransactions = async ({ accountId, consent, from, before }: FetchTransactionsParams) => {
  const response = await fetch(Endpoints.transactions(accountId, from, before), {
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
