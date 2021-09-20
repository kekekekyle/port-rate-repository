import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/queries';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({ variables: { review: { ownerName: ownerName, repositoryName: repositoryName, rating: Number(rating), text: text } } });

    return data;
  };

  return [createReview, result];
};

export default useCreateReview;