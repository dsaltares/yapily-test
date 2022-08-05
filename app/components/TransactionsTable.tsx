import { useRouter } from 'next/router';
import format from 'date-fns/format';
import type { PropsWithChildren } from 'react';
import classNames from 'classnames';
import useTransactions from '@lib/hooks/useTransactions';
import formatSum from '@lib/formatSum';

const Cell = ({ children }: PropsWithChildren) => (
  <td className="px-2 py-2">{children}</td>
);

type HeaderCellProps = PropsWithChildren<{
  width?: string;
}>;

const HeaderCell = ({ width, children }: HeaderCellProps) => (
  <td style={{ width }} className="px-2 py-2">
    {children}
  </td>
);

const TransactionsTable = () => {
  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const accountId = router.query.accountId as string;
  const { data: transactions } = useTransactions({
    institutionId,
    accountId,
  });

  return (
    <table className="table-fixed text-sm text-left">
      <thead>
        <tr className="bg-primary text-white">
          <HeaderCell>Date</HeaderCell>
          <HeaderCell width="30%">Description</HeaderCell>
          <HeaderCell>Amount</HeaderCell>
          <HeaderCell>Balance</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {transactions &&
          transactions.map((transaction) => (
            <tr
              className="even:bg-purple-100 odd:bg-purple-200"
              key={transaction.id}
            >
              <Cell>
                {format(new Date(transaction.date), 'MMM d yyyy - HH:mm')}
              </Cell>
              <Cell>{transaction.description}</Cell>
              <Cell>
                <div
                  className={classNames({
                    'text-green-500': transaction.amount > 0,
                    'text-red-500': transaction.amount < 0,
                  })}
                >
                  {formatSum(transaction.currency, transaction.amount)}
                </div>
              </Cell>
              <Cell>
                <div
                  className={classNames({
                    'text-green-500':
                      transaction.balance.balanceAmount.amount > 0,
                    'text-red-500':
                      transaction.balance.balanceAmount.amount < 0,
                  })}
                >
                  {formatSum(
                    transaction.balance.balanceAmount.currency,
                    transaction.balance.balanceAmount.amount
                  )}
                </div>
              </Cell>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
