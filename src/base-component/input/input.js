import { Input } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

const FormInput = forwardRef(
  (
    {
      name,
      onFocus,
      onBlur,
      onInput,
      onChange,
      required,
      minLength,
      maxLength,
      min,
      max,
      pattern,
      type = 'text',
      disable,
      autoComplete = 'none',
      placeHolder = '',
      autoCapitalize,
      defaultValue = '',
      customValidate,
      onError
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);
    const [isInvalid, setIsInvalid] = useState(false);
    const firstTime = useRef(false);

    useImperativeHandle(ref, () => ({
      get: () => value?.trim(),
      set: (value) => {
        setValue(value);
      },
      validate: () => {
        if (required && !value) {
          onError('Vui lòng nhập trường này!');
          setIsInvalid(true);
          return false;
        }
        if (customValidate) {
          return customValidate(value);
        }
        return !isInvalid;
      }
    }));

    useEffect(() => {
      if (!firstTime.current) {
        firstTime.current = true;
        return;
      }

      if (customValidate) {
        return customValidate(value);
      }

      let errorMessage;

      if (required && !value) {
        errorMessage = 'Vui lòng nhập trường này!';
      } else if (minLength && value.length < minLength) {
        errorMessage = `Vui lòng nhập tối thiểu ${minLength} ký tự!`;
      }
      //mong muốn pattern là 1 object gồm : {value: chuỗi regex, message: message lỗi}
      else if (value && !isEmpty(pattern) && !pattern.value.test(value)) {
        errorMessage = pattern.message;
      } else if (type === 'number') {
        const convertValueToNumber = Number(value);
        if (convertValueToNumber < min) {
          errorMessage = `Vui lòng nhập giá trị tối thiểu là ${min}!`;
        } else if (convertValueToNumber > max) {
          errorMessage = `Vui lòng nhập giá trị tối đa là ${max}!`;
        }
      }
      setIsInvalid(errorMessage);
      if (onError && errorMessage) {
        onError(errorMessage);
      }
    }, [customValidate, max, min, minLength, onChange, onError, pattern, required, type, value]);

    const onChangeInput = useCallback(
      (e) => {
        if (typeof onChange === 'function') {
          onChange(e);
        }
        const value = e.target.value;
        if (maxLength && value.length > maxLength) {
          if (onError) {
            onError(`Vui lòng nhập tối đa ${maxLength} ký tự!`);
          }
          setIsInvalid(true);
          return;
        }
        setValue(value);
      },
      [maxLength, onChange, onError]
    );

    const onKeyPress = useCallback(
      (event) => {
        if (type === 'number') {
          if (!/^\d*\.?\d*$/.test(event.key)) {
            event.preventDefault();
          }
        }
      },
      [type]
    );

    return (
      // <ChakraProvider>
      <Input
        id={name}
        name={name}
        isDisabled={disable}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeHolder}
        autoCapitalize={autoCapitalize}
        value={value}
        onBlur={onBlur}
        isInvalid={isInvalid}
        _focus={{ borderColor: isInvalid && 'red', boxShadow: isInvalid && '0 0 0 1px #e53e3e' }}
        onFocus={onFocus}
        onInput={onInput}
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
      />
      // </ChakraProvider>
    );
  }
);

export default memo(FormInput);

FormInput.propTypes = {
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  required: PropTypes.bool,
  pattern: PropTypes.shape({
    value: PropTypes.instanceOf(RegExp).isRequired,
    message: PropTypes.string
  }),
  disable: PropTypes.bool,
  placeHolder: PropTypes.string,
  type: PropTypes.string,
  customValidate: PropTypes.func,
  setError: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  autoCapitalize: PropTypes.oneOf(['off', 'none', 'on', 'sentences', 'words', 'characters']),
  autoComplete: PropTypes.string,
  defaultValue: PropTypes.string
};
