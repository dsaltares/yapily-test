import { useRouter } from 'next/router';
import useAccounts from '@lib/hooks/useAccounts';
import AccountListItem from './AccountListItem';
import Spinner from './Spinner';

const AccountsList = () => {
  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const { data: accounts, isLoading } = useAccounts(institutionId);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && (!accounts || !accounts.length)) {
    return (
      <div className="flex justify-center">
        <p className="text-slate-700">🤷 Could not find any accounts</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {accounts &&
        accounts.map((account) => (
          <AccountListItem key={account.id} account={account} />
        ))}
    </ul>
  );
};

export default AccountsList;
