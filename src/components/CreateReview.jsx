import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useHistory } from 'react-router-native';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
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
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .integer()
    .min(0)
    .max(100)
    .required('Rating is required'),
});

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput testID='ownerNameField' name='ownerName' placeholder='Repository owner name' />
      <FormikTextInput testID='repositoryNameField' name='repositoryName' placeholder='Repository name' />
      <FormikTextInput testID='ratingField' name='rating' placeholder='Rating between 0 and 100' />
      <FormikTextInput testID='textField' name='text' placeholder='Review' multiline />
      <Pressable testID='submitButton' style={styles.pressableContainer} onPress={onSubmit}>
        <Text>Create review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const {
      ownerName,
      repositoryName,
      rating,
      text } = values;

    try {
      const data = await createReview({ ownerName, repositoryName, rating, text });
      const repoId = data.createReview.repositoryId;
      history.push(`/repository/${repoId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CreateReviewContainer
      onSubmit={onSubmit}
    />
  );
};

export default CreateReview;