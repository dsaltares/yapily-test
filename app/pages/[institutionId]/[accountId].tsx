import { useRouter } from 'next/router';
import Head from 'next/head';
import useEnsureConsent from '@lib/hooks/useEnsureConsent';
import Layout from '@components/Layout';
import useAccount from '@lib/hooks/useAccount';
import TransactionsTable from '@components/TransactionsTable';
import MonthPicker from '@components/MonthPicker';

const AccountPage = () => {
  useEnsureConsent();

  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const accountId = router.query.accountId as string;
  const { data: account } = useAccount(institutionId, accountId);

  const title = account
    ? `Transactions - ${account.accountNames[0].name}`
    : 'Transactions';

  return (
    <>
      <Head>
        <title>Yapily Banking App - Transactions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title={title}>
        <div className="flex flex-col justify-center items-center gap-4">
          <MonthPicker />
          <TransactionsTable />
        </div>
      </Layout>
    </>
  );
};

export default AccountPage;
