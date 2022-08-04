const QueryKeys = {
  institutions: ['institutions'],
  accounts: (institutionId: string) => ['accounts', institutionId],
  consents: (institutionId: string) => ['consents', institutionId],
};

export default QueryKeys;
