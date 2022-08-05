import { useRouter } from 'next/router';
import { useMemo } from 'react';
import classNames from 'classnames';
import type { Account } from '@lib/hooks/useAccounts';

type AccountListItemProps = {
  account: Account;
};

const AccountListItem = ({ account }: AccountListItemProps) => {
  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: account.currency,
      }),
    [account]
  );

  return (
    <li>
      <button
        className="w-full flex flex-row justify-between p-2 border border-slate-300 rounded-lg hover:bg-slate-100"
        onClick={() => router.push(`/${institutionId}/${account.id}`)}
      >
        <div>{account.accountNames[0]?.name}</div>
        <div
          className={classNames({
            'text-green-500': account.balance > 0,
            'text-red-500': account.balance < 0,
          })}
        >
          {formatter.format(account.balance)}
        </div>
      </button>
    </li>
  );
};

export default AccountListItem;
