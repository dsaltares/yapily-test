const QueryKeys = {
  institutions: ['institutions'],
  accounts: (institutionId: string) => ['accounts', institutionId],
  consents: (institutionId: string) => ['consents', institutionId],
  transactions: (institutionId: string, accountId: string, from: string, before: string) => ['transactions', institutionId, accountId, from, before],
};

export default QueryKeys;
