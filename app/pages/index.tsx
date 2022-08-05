import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '@components/Layout';
import InstitutionList from '@components/InstitutionList';

const InstitutionsPage: NextPage = () => (
  <>
    <Head>
      <title>Yapily Banking App - Institutions</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Layout title="Select institution">
      <InstitutionList />
    </Layout>
  </>
);

export default InstitutionsPage;
