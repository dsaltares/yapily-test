const QueryKeys = {
  institutions: ['institutions'],
  accounts: (institutionId: string) => ['accounts', institutionId],
  consents: () => ['consents'],
  transactions: (
    institutionId: string,
    accountId: string,
    from?: string,
    before?: string
  ) => ['transactions', institutionId, accountId, from, before],
};

export default QueryKeys;
