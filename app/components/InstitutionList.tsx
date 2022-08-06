import useInstitutions from '@lib/hooks/useInstitutions';
import InstitutionListItem from './InstitutionListItem';
import Spinner from './Spinner';

const InstitutionList = () => {
  const { data: institutions, isLoading } = useInstitutions();

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && (!institutions || !institutions.length)) {
    return (
      <div className="flex justify-center">
        <p className="text-slate-700">🤷 Could not find any institutions</p>
      </div>
    );
  }

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
