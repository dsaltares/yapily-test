const baseUrl =
  typeof window === 'undefined'
    ? 'http://localhost:3000'
    : window.location.origin;

const Endpoints = {
  accountAuthorization: `${baseUrl}/api/accountAuthorization`,
  accounts: `${baseUrl}/api/accounts`,
  institutions: `${baseUrl}/api/institutions`,
  consents: `${baseUrl}/api/consents`,
  transactions: (accountId: string, from?: string, before?: string) => {
    const query = new URLSearchParams();
    if (from) {
      query.set('from', from);
    }
    if (before) {
      query.set('before', before);
    }
    const base = `${baseUrl}/api/transactions/${accountId}`;
    return Array.from(query.entries()).length > 0
      ? `${base}?${query.toString()}`
      : base;
  },
};

export default Endpoints;
