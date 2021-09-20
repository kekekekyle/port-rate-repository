import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'space-evenly',
  }
});

const AppBarTab = ({ label, link, onPress }) => {
  return (
    <View style={styles.container}>
      {onPress
        ? <Pressable onPress={onPress}>
            <Text color='primary' fontSize='subheading' fontWeight='bold'>
                {label}
            </Text>
          </Pressable>
        : <Link to={link}>
            <Text color='primary' fontSize='subheading' fontWeight='bold'>
                {label}
            </Text>
          </Link>}
    </View>
  );
};

export default AppBarTab;