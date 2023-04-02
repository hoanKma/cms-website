import PropTypes from 'prop-types';
import { forwardRef, memo, useCallback, useMemo } from 'react';

import { Flex, FormControl, FormErrorMessage, FormLabel, Radio, RadioGroup } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

/**
 * Ref for radio:
 * - If a radio is selected: ref at that value
 * - Otherwise: ref at the first radio
 */
const ControlledRadioGroup = forwardRef((props, ref) => {
  const {
    // Form value
    options,
    selectedValue,
    // Style props
    direction
  } = props;

  const refAtIdx = useMemo(() => {
    let _refAtIdx = 0;

    // every() and some() are breakable forEach()
    options.every((option, idx) => {
      if (option.value !== selectedValue) return true;
      _refAtIdx = idx;
      return false;
    });

    return _refAtIdx;
  }, [options, selectedValue]);

  // Special handling for boolean
  // If this block is removed, use setValueAs in register options
  // https://react-hook-form.com/api/useform/register#options
  const { onChange: onItemChange } = props;
  const onChange = useCallback(
    (v) => {
      // prettier-ignore
      if      (v === "true")  onItemChange(true);
      else if (v === "false") onItemChange(false);
      else onItemChange(v);
    },
    [onItemChange]
  );

  return (
    <RadioGroup onChange={onChange} value={selectedValue}>
      <Flex justify={'space-around'} direction={direction} gap={2}>
        {options.map((option, idx) => (
          <Radio ref={idx === refAtIdx ? ref : undefined} key={idx} value={option.value}>
            {option.text}
          </Radio>
        ))}
      </Flex>
    </RadioGroup>
  );
});

const FormRadioGroup = memo(({ formConfig }) => {
  const { key, title, options, rules, direction } = formConfig;

  // https://github.com/react-hook-form/react-hook-form/discussions/2927
  return (
    <Controller
      name={key}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormControl as="fieldset" isInvalid={fieldState.isInvalid}>
          <FormLabel as="legend">{title}</FormLabel>
          <ControlledRadioGroup
            options={options}
            selectedValue={field.value}
            onChange={field.onChange}
            ref={field.ref}
            direction={direction}
          />

          <FormErrorMessage>{fieldState.error}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
});

export default FormRadioGroup;

FormRadioGroup.propTypes = {
  formConfig: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.node,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        text: PropTypes.node.isRequired
      })
    ).isRequired,
    rules: PropTypes.object,
    direction: PropTypes.oneOf(['row', 'column'])
  }).isRequired
};
