import useAccounts from "@lib/hooks/useAccounts";
import useEnsureConsent from "@lib/hooks/useEnsureConsent";
import useTransactions from "@lib/hooks/useTransactions";
import { useRouter } from "next/router";

const AccountPage = () => {
  useEnsureConsent();

  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const accountId = router.query.accountId as string;
  const { data: transactions } = useTransactions(institutionId, accountId);

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
