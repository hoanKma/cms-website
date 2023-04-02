import PropTypes from 'prop-types';
import { memo } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const FormTextarea = memo(({ formConfig, height: height1 }) => {
  // prettier-ignore
  const {
    // RHF props
    key, title, rules,
    // Input props
    placeholder,
    maxLength, height ,// TODO: deduplicate height
    size
  } = formConfig;

  const { formState, register } = useFormContext();
  const error = formState.errors[key]?.message;

  return (
    <FormControl isInvalid={error}>
      <FormLabel id={key}>{title}</FormLabel>
      <Textarea
        id={key}
        {...register(key, rules)}
        height={height || height1}
        placeholder={placeholder}
        maxLength={maxLength}
        overflow="auto"
      />
      <FormErrorMessage size={size}>{error}</FormErrorMessage>
    </FormControl>
  );
});

export default FormTextarea;

FormTextarea.propTypes = {
  formConfig: PropTypes.shape({
    // RHF props
    key: PropTypes.string.isRequired,
    title: PropTypes.string,
    rules: PropTypes.object,
    size: PropTypes.string,

    // Input props
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired,

  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};
