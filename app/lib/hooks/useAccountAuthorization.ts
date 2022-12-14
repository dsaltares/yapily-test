import { useMutation } from '@tanstack/react-query';
import Endpoints from '@lib/endpoints';

const useAccountAuthorization = () =>
  useMutation(getAccountAuthorizationUrl, {
    onSuccess: (url) => window.location.assign(url),
  });

export default useAccountAuthorization;

const getAccountAuthorizationUrl = async (institutionId: string) => {
  const response = await fetch(Endpoints.accountAuthorization, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      institutionId,
    }),
  });

  const json = await response.json();
  return json.data.authorisationUrl as string;
};
