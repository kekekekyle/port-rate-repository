import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    backgroundColor: theme.colors.appBarBackground,
    opacity: 0.75
  }
});

const AppBar = () => {
  const { data, loading } = useQuery(GET_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (loading) {
    return null;
  }

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label='Repositories' link={'/'} />
        { !data.authorizedUser === false && <AppBarTab label='Create a review' link={'/create_review'} /> }
        { data.authorizedUser && <AppBarTab label='My Reviews' link={'/reviews'} /> }
        { data.authorizedUser
          ? <AppBarTab label='Sign Out' onPress={signOut} />
          : <AppBarTab label='Sign In' link={'/signin'} />
        }
        { !data.authorizedUser === true && <AppBarTab label='Sign Up' link={'/signup'} /> }
      </ScrollView>
    </View>
  );
};

export default AppBar;