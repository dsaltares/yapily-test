import Head from 'next/head';
import Layout from '@components/Layout';
import AccountsList from '@components/AccountsList';
import WithConsent from '@components/WithConsent';

const AccountsPage = () => (
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

export default WithConsent(AccountsPage);
