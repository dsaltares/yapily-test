const QueryKeys = {
  institutions: ['institutions'],
  accounts: (institutionId: string) => ['accounts', institutionId],
  consents: (institutionId: string) => ['consents', institutionId],
  transactions: (institutionId: string, accountId: string) => ['transactions', institutionId, accountId],
};

export default QueryKeys;
