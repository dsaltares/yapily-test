import useInstitutions from '@lib/hooks/useInstitutions';
import InstitutionListItem from './InstitutionListItem';

const InstitutionList = () => {
  const { data: institutions } = useInstitutions();

  return (
    <ul className="flex flex-col gap-2">
      {institutions &&
        institutions.map((institution) => (
          <InstitutionListItem key={institution.id} institution={institution} />
        ))}
    </ul>
  );
};

export default InstitutionList;
