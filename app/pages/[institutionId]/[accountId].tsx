import startOfMonth from 'date-fns/startOfMonth';
import useEnsureConsent from "@lib/hooks/useEnsureConsent";
import useTransactions from "@lib/hooks/useTransactions";
import { useRouter } from "next/router";

const AccountPage = () => {
  useEnsureConsent();

  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const accountId = router.query.accountId as string;
  const now = new Date();
  const from = startOfMonth(now).toISOString();
  const before = now.toISOString();
  const { data: transactions } = useTransactions({institutionId, accountId, from, before});

  return (
    <ul>
      {
        transactions && transactions.map(transaction => (
          <li key={transaction.id}>
            {`${transaction.date} - ${transaction.amount}${transaction.currency}`}
          </li>
        ))
      }
    </ul>
  )
};

export default AccountPage;
