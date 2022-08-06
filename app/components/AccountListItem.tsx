import { useRouter } from 'next/router';
import classNames from 'classnames';
import type { Account } from '@lib/hooks/useAccounts';
import formatSum from '@lib/formatSum';

type AccountListItemProps = {
  account: Account;
};

const AccountListItem = ({ account }: AccountListItemProps) => {
  const router = useRouter();
  const institutionId = router.query.institutionId as string;

  return (
    <li>
      <button
        className="w-full flex flex-row items-center justify-between p-2 border border-slate-300 rounded-lg hover:bg-slate-100"
        onClick={() => router.push(`/${institutionId}/${account.id}`)}
      >
        <div className="flex flex-col gap-1">
          <div className="flex text-sm">
            {account.accountIdentifications
              .map((id) => id.identification)
              .join(' ')}
          </div>
          <div className="flex text-xs text-slate-700">
            {account.accountNames[0]?.name}
          </div>
        </div>
        <div
          className={classNames({
            'text-green-500': account.balance > 0,
            'text-red-500': account.balance < 0,
          })}
        >
          {formatSum(account.currency, account.balance)}
        </div>
      </button>
    </li>
  );
};

export default AccountListItem;
