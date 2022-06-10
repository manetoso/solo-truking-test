import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { Button, VStack } from '@chakra-ui/react';

// CUSTOM FORM REUSABLE COMPONENT

export const SimpleForm = ({
  theme,
  buttonVariant,
  buttonLabel,
  buttonLoadingLabel,
  initialValues,
  onSubmit,
  validationSchema,
  needToResetForm,
  hasIsLoading,
  isLoading,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        if (hasIsLoading) {
          onSubmit(values);
          return;
        }
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing="4" align="flex-start">
            {children}
            <Button
              w='full'
              type="submit"
              colorScheme={theme}
              variant={buttonVariant}
              isLoading={isLoading && true}
              loadingText={buttonLoadingLabel}
              spinnerPlacement="start"
            >
              {buttonLabel}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

SimpleForm.propTypes = {
  buttonLabel: PropTypes.string,
  buttonLoadingLabel: PropTypes.string,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object,
  needToResetForm: PropTypes.bool,
  hasIsLoading: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  buttonVariant: PropTypes.oneOf(['solid', 'outline', 'ghost']),
  theme: PropTypes.oneOf([
    'gray',
    'blue',
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'cyan',
    'purple',
    'pink',
    'accent',
  ]).isRequired,
};

SimpleForm.defaultProps = {
  buttonLabel: 'Submit',
  buttonLoadingLabel: 'Loading',
  buttonVariant: 'ghost',
  theme: 'gray',
};
