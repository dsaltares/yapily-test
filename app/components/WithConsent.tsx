import { useRouter } from 'next/router';
import type { ComponentType } from 'react';
import { useEffect } from 'react';
import useConsents from '@lib/hooks/useConsents';
import Spinner from './Spinner';

function WithConsent<T>(Component: ComponentType<T>) {
  return function WithConsentComponent(props: T) {
    const router = useRouter();
    const institutionId = router.query.institutionId as string;
    const { data: consents, status } = useConsents();
    const consent = consents?.[institutionId];

    useEffect(() => {
      if (institutionId && !consent && status !== 'loading') {
        void router.push('/');
      }
    }, [consent, status, router, institutionId]);

    if (status === 'loading') {
      return (
        <div className="flex justify-center items-center mt-10">
          <Spinner />
        </div>
      );
    }
    if (consent) {
      return <Component {...props} />;
    }
    return null;
  };
}

export default WithConsent;
