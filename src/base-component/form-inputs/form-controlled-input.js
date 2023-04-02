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
import { Controller } from 'react-hook-form';

const FormControlledInput = forwardRef(({ formConfig, onBlur, onInput }, ref) => {
  useImperativeHandle(ref, () => ({
    // TODO: check ref to focus
    focus: () => internalRef.current?.focus()
  }));
  const internalRef = useRef();

  // prettier-ignore
  const {
    // RHF props
    key, title, rules, helper, disable,
    // Input props
    type, autoComplete, placeholder, maxLength, autoCapitalize, inputMode,
    // Style props
    size, textTransform, width, _placeholder, 
    // Chakra specific props
    inputLeft, inputRight,
    // Custom props
    onlyNumber, transform
  } = formConfig;

  // NOT useCallback
  const onKeyPress = useMemo(() => {
    if (!onlyNumber) return undefined;
    return (event) => {
      if (!/[0-9]/.test(event.key)) event.preventDefault();
    };
  }, [onlyNumber]);

  return (
    <Controller
      name={key}
      rules={rules}
      render={({ field, fieldState }) => {
        return (
          <FormControl isInvalid={fieldState.error}>
            {title && <FormLabel htmlFor={key}>{title}</FormLabel>}
            <InputGroup>
              {inputLeft && <InputLeftElement h="100%">{inputLeft}</InputLeftElement>}

              <Input
                // RHF
                id={key}
                isDisabled={disable}
                onChange={(e) => field.onChange(transform.output(e.target.value))}
                value={transform.input(field?.value)}
                // Input props
                type={type}
                inputMode={inputMode}
                autoComplete={autoComplete}
                placeholder={placeholder}
                maxLength={maxLength}
                autoCapitalize={autoCapitalize}
                // Style props
                size={size}
                width={width}
                textTransform={textTransform}
                _placeholder={_placeholder}
                // Event handlers
                onBlur={onBlur}
                onInput={onInput}
                onKeyPress={onKeyPress}
              />

              {inputRight && <InputRightElement h="100%">{inputRight}</InputRightElement>}
            </InputGroup>
            {fieldState.error && <FormErrorMessage size={size}>{fieldState.error.message}</FormErrorMessage>}
            {!fieldState.error && helper && <FormHelperText size={size}>{helper}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
});

export default FormControlledInput;

FormControlledInput.propTypes = {
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
    inputMode: PropTypes.oneOf(['none', 'text ', 'decimal', 'numeric', 'tel', 'search', 'email', 'url']),

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
