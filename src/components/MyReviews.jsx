import React from 'react';
import { StyleSheet, View, Pressable, FlatList, Alert } from 'react-native';
import Text from './Text';
import ItemSeparator from './ItemSeparator';
import useMyReviews from '../hooks/useMyReviews';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15
  },
  reviewContainer: {
    flexShrink: 1,
  },
  ratingContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'blue',
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  rating: {
    color: 'blue',
    fontSize: 20
  },
  pressablesContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  viewPressableContainer: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexGrow: 1,
  },
  deletePressableContainer: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexGrow: 1,
  }
});

const ReviewItem = ({ review, refetch }) => {
  const history = useHistory();
  const [mutate] = useMutation(DELETE_REVIEW);

  const onViewPress = () => {
    history.push(`/repository/${review.node.repositoryId}`);
  };

  const onDeletePress = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => deleteReview()
        }
      ]
    );
  };

  const deleteReview = async () => {
    await mutate({ variables: { id: review.node.id } });
    await refetch();
  };

  return (
    <View>
      <View style={styles.container}>
        <ItemSeparator />
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>
            {review.node.rating}
          </Text>
        </View>
        <View style={styles.reviewContainer}>
          <Text fontWeight='bold'>
            {review.node.repositoryId}
          </Text>
          <Text color='textSecondary'>
            {review.node.createdAt.split('T')[0]}
          </Text>
          <Text>
            {review.node.text}
          </Text>
        </View>
      </View>
      <View style={styles.pressablesContainer}>
        <Pressable style={styles.viewPressableContainer} onPress={onViewPress}>
          <Text color='primary'>
            View Repository
          </Text>
        </Pressable>
        <Pressable style={styles.deletePressableContainer} onPress={onDeletePress}>
          <Text color='primary'>
            Delete Review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const queryParams = {
    includeReviews: true,
    first: 2,
  };

  const { reviews, refetch, fetchMore } = useMyReviews(queryParams);

  if (!reviews) { 
    return null;
  }

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ node }) => node.id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

export default MyReviews;