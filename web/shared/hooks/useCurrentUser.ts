import { useGetCurrentUserQuery } from 'generated/client';

export const useCurrentUser = () => {
  const { data } = useGetCurrentUserQuery({
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  return data?.currentUser;
};
