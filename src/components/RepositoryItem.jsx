import React from 'react';
import { StyleSheet, View, Image, Pressable, FlatList } from 'react-native';
import Text from './Text';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';
import ItemSeparator from './ItemSeparator';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 10,
    backgroundColor: 'white'
  },
  topContainer: {
    flexDirection: 'row'
  },
  logoContainer: {
    margin: 10
  },
  description: {
    margin: 10,
    flexShrink: 1,
  },
  languageContainer: {
    flexDirection: 'row',
  },
  languageTextContainer: {
    backgroundColor: '#0366d6',
    padding: 5,
    borderRadius: 5
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 10
  },
  statContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  repoContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  pressableContainer: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 20,
    margin: 15,
    alignItems: 'center'
  }
});

const reviewStyle = StyleSheet.create({
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
  }
});

const ReviewItem = ({ review }) => {
  return (
    <View style={reviewStyle.container}>
      <ItemSeparator />
      <View style={reviewStyle.ratingContainer}>
        <Text style={reviewStyle.rating}>
          {review.node.rating}
        </Text>
      </View>
      <View style={reviewStyle.reviewContainer}>
        <Text fontWeight='bold'>
          {review.node.user.username}
        </Text>
        <Text color='textSecondary'>
          {review.node.createdAt.split('T')[0]}
        </Text>
        <Text>
          {review.node.text}
        </Text>
      </View>
    </View>
  );
};

const RepositoryHeader = ({ repository, onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <RepositoryItem item={repository} />
      <Pressable style={styles.pressableContainer} onPress={() => onPress(repository.url)}>
        <Text color='primary'>
          Open in GitHub
        </Text>
      </Pressable>
    </View>
  );
};

export const Repository = () => {
  const params = useParams();

  const queryParams = {
    id: params.id,
    first: 4,
  };

  const { repository, fetchMore } = useRepository(queryParams);

  if (!repository) { 
    return null;
  }

  const reviews = repository.reviews.edges;

  const onEndReach = () => {
    fetchMore();
  };

  const onPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryHeader repository={repository} onPress={onPress} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.description}>
          <Text testID={item.id + '_fullName'} fontWeight='bold'>
            {item.fullName}
          </Text>
          <Text testID={item.id + '_description'} color='textSecondary'>
            {item.description}
          </Text>
          <View style={styles.languageContainer}>
            <View style={styles.languageTextContainer}>
              <Text testID={item.id + '_language'} color='primary'>
                {item.language}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statContainer}>
          <Text testID={item.id + '_stargazersCount'} fontWeight='bold'>
            {item.stargazersCount > 1000 ? Math.round(item.stargazersCount / 100) / 10 + 'k' : item.stargazersCount}
          </Text>
          <Text color='textSecondary'>
            stars
          </Text>
        </View>
        <View style={styles.statContainer}>
          <Text testID={item.id + '_forksCount'} fontWeight='bold'>
            {item.forksCount > 1000 ? Math.round(item.forksCount / 100) / 10 + 'k' : item.forksCount}
          </Text>
          <Text color='textSecondary'>
            forks
          </Text>
        </View>
        <View style={styles.statContainer}>
          <Text testID={item.id + '_reviewCount'} fontWeight='bold'>
            {item.reviewCount > 1000 ? Math.round(item.reviewCount / 100) / 10 + 'k' : item.reviewCount}
          </Text>
          <Text color='textSecondary'>
            reviews
          </Text>
        </View>
        <View style={styles.statContainer}>
          <Text testID={item.id + '_ratingAverage'} fontWeight='bold'>
            {item.ratingAverage}
          </Text>
          <Text color='textSecondary'>
            rating
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;