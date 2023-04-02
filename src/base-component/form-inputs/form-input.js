import PropTypes from 'prop-types';
import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

const FormInput = forwardRef(({ formConfig, onBlur, onInput }, ref) => {
  useImperativeHandle(ref, () => ({
    focus: () => internalRef.current?.focus()
  }));
  const internalRef = useRef();

  // prettier-ignore
  const {
    // RHF props
    key, title, rules, helper, disable,
    // Input props
    type, autoComplete, placeholder, maxLength, onlyNumber, autoCapitalize,
    // Style props
    size, textTransform, width, _placeholder, fontWeight,
    // Chakra specific props
    inputLeft, inputRight
  } = formConfig;

  const { formState, register } = useFormContext();
  const { ref: rhfRef, ...registerProps } = register(key, rules);
  const error = formState.errors[key]?.message;

  // NOT useCallback
  const onKeyPress = useMemo(() => {
    if (!onlyNumber) return undefined;
    return (event) => {
      if (!/[0-9]/.test(event.key)) event.preventDefault();
    };
  }, [onlyNumber]);

  return (
    <FormControl isInvalid={error}>
      {title && <FormLabel htmlFor={key}>{title}</FormLabel>}
      <InputGroup size={size}>
        {inputLeft && <InputLeftElement h="100%">{inputLeft}</InputLeftElement>}

        <Input
          // RHF
          id={key}
          isDisabled={disable}
          ref={(e) => {
            rhfRef(e);
            internalRef.current = e;
          }}
          {...registerProps}
          // Input props
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          // Style props
          fontWeight={fontWeight}
          width={width}
          height={'50px'}
          textTransform={textTransform}
          _placeholder={_placeholder}
          // Event handlers
          onBlur={onBlur}
          onInput={onInput}
          onKeyPress={onKeyPress}
        />

        {inputRight && <InputRightElement h="100%">{inputRight}</InputRightElement>}
      </InputGroup>
      {error && <FormErrorMessage size={size}>{error}</FormErrorMessage>}
      {!error && helper && <FormHelperText size={size}>{helper}</FormHelperText>}
    </FormControl>
  );
});

export default FormInput;

FormInput.propTypes = {
  formConfig: PropTypes.shape({
    // RHF props
    key: PropTypes.string.isRequired,
    title: PropTypes.string,
    rules: PropTypes.object,
    helper: PropTypes.node,
    disable: PropTypes.bool,

    // Input props
    type: PropTypes.string,
    autoComplete: PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onlyNumber: PropTypes.bool,
    autoCapitalize: PropTypes.oneOf(['off', 'none', 'on', 'sentences', 'words', 'characters']),

    // Style props
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    textTransform: PropTypes.string,
    _placeholder: PropTypes.object,

    // Chakra specific props
    inputLeft: PropTypes.node,
    inputRight: PropTypes.node
  }).isRequired,

  // Event handlers
  onBlur: PropTypes.func,
  onInput: PropTypes.func
};
