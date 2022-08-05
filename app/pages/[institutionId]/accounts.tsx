import Head from 'next/head';
import useEnsureConsent from '@lib/hooks/useEnsureConsent';
import Layout from '@components/Layout';
import AccountsList from '@components/AccountsList';

const AccountsPage = () => {
  useEnsureConsent();

  return (
    <>
      <Head>
        <title>Yapily Banking App - Accounts</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout title="Select account">
        <AccountsList />
      </Layout>
    </>
  );
};

export default AccountsPage;
