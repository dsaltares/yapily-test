import { useMemo } from 'react';
import useTransactions from './useTransactions';

type UseBalancesParams = {
  institutionId: string;
  accountId: string;
  from?: string;
  before?: string;
};

const useBalances = (params: UseBalancesParams) => {
  const { data, ...result } = useTransactions(params);
  const balances: Balance[] | undefined = useMemo(
    () =>
      data &&
      data
        .map(({ date, balance }) => ({
          date,
          amount: balance.balanceAmount.amount,
        }))
        .reverse(),
    [data]
  );
  return {
    ...result,
    data: balances,
  };
};

export default useBalances;

export type Balance = {
  date: string;
  amount: number;
};
