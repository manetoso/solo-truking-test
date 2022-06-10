import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { CloseIcon } from '@chakra-ui/icons'

// CUSTOM INPUT REUSABLE COMPONENT

export const InputForm = ({
  label,
  type,
  variant,
  placeholder,
  isHidden,
  hasClearButton,
  onClickClearButton,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  return (
    <>
      <FormControl isReadOnly={isHidden && true}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        {!hasClearButton && (
          <Input
            id={field.name}
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            checked={field.checked}
            multiple={field.multiple}
            type={type}
            variant={variant}
            placeholder={placeholder}
            autoComplete="off"
            focusBorderColor="accent.500"
            errorBorderColor="red.500"
            isInvalid={
              meta.touched &&
              meta.error !== undefined &&
              meta.error.length > 0 &&
              true
            }
          />
        )}
        {hasClearButton && (
          <InputGroup size="md">
            <Input
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              checked={field.checked}
              multiple={field.multiple}
              type={type}
              variant={variant}
              placeholder={placeholder}
              autoComplete="off"
              focusBorderColor="accent.500"
              errorBorderColor="red.500"
              isInvalid={
                meta.touched &&
                meta.error !== undefined &&
                meta.error.length > 0 &&
                true
              }
            />
            <InputRightElement right="0.5rem">
              <IconButton
                size="sm"
                onClick={() => {
                  helpers.setValue('');
                  onClickClearButton();
                }}
                variant="solid"
                colorScheme="red"
                rounded="md"
                aria-label="clear search"
                icon={<CloseIcon />}
              />
            </InputRightElement>
          </InputGroup>
        )}
        {meta.touched && meta.error && (
          <Text color="red.500" fontSize="md">
            {meta.error}
          </Text>
        )}
      </FormControl>
    </>
  );
};

InputForm.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isHidden: PropTypes.bool,
  hasClearButton: PropTypes.bool,
  onClickClearButton: PropTypes.func,
  variant: PropTypes.oneOf(['solid', 'outline', 'ghost', 'filled']),
  type: PropTypes.oneOf([
    'text',
    'password',
    'email',
    'date',
    'number',
    'file',
  ]),
};

InputForm.defaultProps = {
  label: 'Text Input',
  placeholder: 'Text in the input',
  variant: 'filled',
  type: 'text',
};
