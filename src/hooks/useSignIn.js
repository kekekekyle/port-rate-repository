import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({variables: { credentials: { username, password } } });
    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();

    return data;
  };

  return [signIn, result];
};

export default useSignIn;