import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@components/Layout';
import useAccount from '@lib/hooks/useAccount';
import TransactionsTable from '@components/TransactionsTable';
import MonthPicker from '@components/MonthPicker';
import BalanceChart from '@components/BalanceChart';
import formatSum from '@lib/formatSum';
import WithConsent from '@components/WithConsent';

const AccountPage = () => {
  const router = useRouter();
  const institutionId = router.query.institutionId as string;
  const accountId = router.query.accountId as string;
  const { data: account } = useAccount(institutionId, accountId);

  const title = account
    ? `${account.accountNames[0].name} - ${formatSum(
        account.currency,
        account.balance
      )}`
    : '';

  return (
    <>
      <Head>
        <title>Yapily Banking App - Transactions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title={title}>
        <div className="flex flex-col justify-center items-center gap-6">
          <MonthPicker />
          <BalanceChart />
          <TransactionsTable />
        </div>
      </Layout>
    </>
  );
};

export default WithConsent(AccountPage);
