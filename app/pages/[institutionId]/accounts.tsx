import useAccounts from "@lib/hooks/useAccounts";
import useEnsureConsent from "@lib/hooks/useEnsureConsent";
import { useRouter } from "next/router";

const AccountsPage = () => {
  useEnsureConsent();

  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const { data: accounts } = useAccounts(institutionId);

  return (
    <ul>
      {
        accounts && accounts.map(account => (
          <li key={account.id}>
            {`${account.accountNames[0].name} - ${account.balance}${account.currency}`}
          </li>
        ))
      }
    </ul>
  )
};

export default AccountsPage;
