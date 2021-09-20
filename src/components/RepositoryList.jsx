import React, { useState } from 'react';
import { FlatList, Pressable, View, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from 'react-router-native';
import ItemSeparator from './ItemSeparator';
import { useDebouncedCallback } from 'use-debounce';

import { Picker } from '@react-native-picker/picker';

const RepositoryHeader = ({ debounced, sortOrder, setSortOrder }) => {

  return (
    <View>
      <TextInput name='filter' placeholder='Filter' onChangeText={text => debounced(text)} />
      <Picker
        selectedValue={sortOrder}
        onValueChange={(itemValue) => {
          setSortOrder(itemValue);
        }}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({ debounced, sortOrder, setSortOrder, repositories, onEndReach }) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => {

    const getRepository = (id) => {
      history.push(`/repository/${id}`);
    };

    return (
      <Pressable onPress={() => getRepository(item.id)}>
        <RepositoryItem item={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      ListHeaderComponent={<RepositoryHeader 
        debounced={debounced}
        sortOrder={sortOrder} 
        setSortOrder={setSortOrder} 
        />
      }
      onEndReached={onEndReach}
      onEndReachedThreshold={0.2}
    />
  );
};

const RepositoryList = () => {
  const [sortOrder, setSortOrder] = useState();
  const [filter, setFilter] = useState('');
  const debounced = useDebouncedCallback(filter => setFilter(filter), 500);

  let queryParams = {};
  switch (sortOrder) {
    case "latest":
      queryParams = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      break;
    case 'highest':
      queryParams = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      break;
    case 'lowest':
      queryParams = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      break;
    default:
      queryParams = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  }
  queryParams = {
    ...queryParams,
    searchKeyword: filter,
    first: 4,
  };

  const { repositories, fetchMore } = useRepositories(queryParams);

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      debounced={debounced}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      repositories={repositories}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
