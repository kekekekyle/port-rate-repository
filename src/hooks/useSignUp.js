import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/queries';

const useSignIn = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({variables: { user: { username, password } } });

    return data;
  };

  return [signIn, result];
};

export default useSignIn;