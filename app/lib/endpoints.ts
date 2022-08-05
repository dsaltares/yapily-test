const baseUrl =
  typeof window === 'undefined'
    ? 'http://localhost:3000'
    : window.location.origin;

const Endpoints = {
  accountAuthorization: `${baseUrl}/api/accountAuthorization`,
  accounts: `${baseUrl}/api/accounts`,
  institutions: `${baseUrl}/api/institutions`,
  transactions: (accountId: string, from?: string, before?: string) => {
    const query = new URLSearchParams();
    if (from) {
      query.set('from', from);
    }
    if (before) {
      query.set('before', before);
    }
    return `${baseUrl}/api/transactions/${accountId}?${query.toString()}`;
  },
};

export default Endpoints;
