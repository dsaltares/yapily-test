const baseUrl =
  typeof window === 'undefined'
    ? 'http://localhost:3000'
    : window.location.origin;

const Endpoints = {
  accountAuthorization: `${baseUrl}/api/accountAuthorization`,
  accounts: `${baseUrl}/api/accounts`,
  institutions: `${baseUrl}/api/institutions`,
  transactions: (accountId: string) => `${baseUrl}/api/transactions/${accountId}`,
};

export default Endpoints;

