const baseUrl =
  typeof window === 'undefined'
    ? 'http://localhost:3000'
    : window.location.origin;

const Endpoints = {
  accountAuthorization: `${baseUrl}/api/accountAuthorization`,
  accounts: `${baseUrl}/api/accounts`,
  institutions: `${baseUrl}/api/institutions`,
  transactions: (accountId: string, from: string, before: string) => {
    const query = new URLSearchParams({
      from,
      before,
    }).toString();
    return `${baseUrl}/api/transactions/${accountId}?${query}`;
  },
};

export default Endpoints;
