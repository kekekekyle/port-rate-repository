import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from 'react-router-native';

import RepositoryList from './RepositoryList';
import CreateReview from './CreateReview';
import { Repository } from './RepositoryItem';
import MyReviews from './MyReviews';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.primary
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Route path='/repository/:id' exact>
          <Repository />
        </Route>
        <Route path='/create_review/' exact>
          <CreateReview />
        </Route>
        <Route path='/reviews/' exact>
          <MyReviews />
        </Route>
        <Route path='/signin' exact>
          <SignIn />
        </Route>
        <Route path='/signup' exact>
          <SignUp />
        </Route>
      </Switch>
    </View>
  );
};

export default Main;