import { useRouter } from 'next/router';
import useAccounts from '@lib/hooks/useAccounts';
import AccountListItem from './AccountListItem';

const AccountsList = () => {
  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const { data: accounts } = useAccounts(institutionId);

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
