import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    marginBottom: 5,
    color: '#d73a4a',
  },
  inputContainer: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: 'grey',
    padding: 5,
    marginTop: 5,
  },
  inputErrorContainer: {
    borderColor: '#d73a4a',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={showError ? styles.inputErrorContainer : styles.inputContainer}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;