import Image from 'next/image';
import useAccountAuthorization from '@lib/hooks/useAccountAuthorization';
import type { Institution } from '@lib/hooks/useInstitutions';

type InstitutionListItemProps = {
  institution: Institution;
};

const InstitutionListItem = ({ institution }: InstitutionListItemProps) => {
  const { mutate: authorizeAccount } = useAccountAuthorization();
  const logo = institution.media.find((media) => media.type === 'icon')?.source;

  return (
    <li>
      <button
        className="w-full p-2 flex flex-row items-center gap-3 border border-slate-300 rounded-lg hover:bg-slate-100"
        onClick={() => authorizeAccount(institution.id)}
      >
        {logo && (
          <Image
            className="rounded"
            src={logo}
            alt="institution logo"
            width={48}
            height={48}
          />
        )}
        {institution.fullName}
      </button>
    </li>
  );
};

export default InstitutionListItem;
