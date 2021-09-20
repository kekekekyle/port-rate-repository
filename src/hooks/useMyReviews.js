import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';

const useMyReviews = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables
      }
    });
  };

  return {
    reviews: data?.authorizedUser.reviews.edges,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useMyReviews;