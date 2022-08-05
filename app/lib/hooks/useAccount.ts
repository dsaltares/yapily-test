import useAccounts from './useAccounts';

const useAccount = (institutionId: string, accountId: string) => {
  const result = useAccounts(institutionId);
  return {
    ...result,
    data: result.data?.find((account) => account.id === accountId),
  };
};

export default useAccount;
