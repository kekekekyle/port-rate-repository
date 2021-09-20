import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router-native';

const initialValues = {
  username: '',
  password: ''
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  pressableContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: 'deepskyblue',
    backgroundColor: 'deepskyblue',
    padding: 5,
    marginTop: 5,
    justifyContent: 'center'
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput testID='usernameField' name='username' placeholder='Username' />
      <FormikTextInput testID='passwordField' name='password' placeholder='Password' secureTextEntry />
      <Pressable testID='submitButton' style={styles.pressableContainer} onPress={onSubmit}>
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer
      onSubmit={onSubmit}
    />
  );
};

export default SignIn;