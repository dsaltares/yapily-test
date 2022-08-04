import Endpoints from "@lib/endpoints";
import { useQuery } from "@tanstack/react-query";
import QueryKeys from "./queryKeys";

const useInstitutions = () => useQuery(QueryKeys.institutions, fetchInstitutions);

const fetchInstitutions = async () => {
  const response = await fetch(Endpoints.institutions);
  const json = await response.json();
  return json.data as Institution[]
};

type Institution = {
  id: string;
  name: string;
  fullName: string;
  countries: Country[];
  media: InstitutionMedia[];
}

type Country = {
  displayName: string;
  countryCode2: string;
}

type InstitutionMedia = {
  source: string;
  type: 'icon' | 'logo';
};

export default useInstitutions;
