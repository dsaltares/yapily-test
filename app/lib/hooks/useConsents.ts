import { useQuery } from '@tanstack/react-query';
import Endpoints from '@lib/endpoints';
import type { InstitutionConsent } from '@lib/types';
import QueryKeys from './queryKeys';

const useConsents = () => useQuery(QueryKeys.consents(), fetchConsents);

export default useConsents;

const fetchConsents = async () => {
  const response = await fetch(Endpoints.consents);
  const json = await response.json();
  return json.consents as Record<string, InstitutionConsent>;
};
