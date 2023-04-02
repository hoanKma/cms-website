import PropTypes from 'prop-types';
import { memo } from 'react';

import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const FormSelect = memo(({ formConfig }) => {
  const { key, title, options, rules } = formConfig;

  const { formState, register } = useFormContext();
  const error = formState.errors[key]?.message;

  return (
    <FormControl isInvalid={error}>
      <FormLabel htmlFor={key}>{title}</FormLabel>
      <Select
        id={key}
        {...register(key, rules)}
        // This is just to select the placeholder option.
        // It does NOT have to match useForm({ defaultValues }).
        // When rendered, RHF sets value via ref, overriding this default.
        defaultValue=""
      >
        <option
          /* Placeholder option
          Chakra select's placeholder is still selectable, so this is better */
          value=""
          disabled
          hidden
          // selected sholdn't be used in React
          // Its function is handled by the above defaultValue
          // selected
        >
          Chọn một giá trị
        </option>

        {options.map(({ value, text }, idx) => (
          <option key={idx} value={value}>
            {text}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});

export default FormSelect;

FormSelect.propTypes = {
  formConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
      })
    ).isRequired,
    rules: PropTypes.object
  }).isRequired
};
