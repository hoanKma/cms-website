import { Select } from 'chakra-react-select';
import { isEmpty } from 'lodash';
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

const DropList = forwardRef((props, ref) => {
  const {
    name,
    isMulti = false,
    placeholder = 'Vui lòng lựa chọn',
    isClearable = true,
    isSearchable = true,
    isDisabled = false,
    defaultValue,
    options,
    isRequired = false,
    customValidate,
    onError,
    onChange,
    valueKey = 'value',
    labelKey = 'label'
  } = props || {};

  const inputProps = {
    name,
    isMulti,
    placeholder,
    isClearable,
    isSearchable,
    isDisabled,
    defaultValue,
    options,
    noOptionsMessage: () => 'Không có dữ liệu'
  };

  const firstTime = useRef();

  const [choice, setChoice] = useState(defaultValue);
  const [validate, setValidate] = useState(true);

  useImperativeHandle(ref, () => ({
    setValues: (newValue) => setChoice(newValue),
    getValues: () => {
      if (!isEmpty(choice)) {
        return choice;
      }

      return undefined;
    },

    validate: () => {
      if (isRequired && isEmpty(choice)) {
        onError && onError('Vui lòng nhập trường này!');
        setValidate(false);
        return false;
      }
      if (typeof customValidate === 'function') {
        return customValidate(choice);
      }

      return validate;
    }
  }));

  useEffect(() => {
    if (isRequired && !firstTime.current) {
      firstTime.current = true;
      return;
    }
    if (typeof customValidate === 'function') {
      return;
    }

    if (!isRequired) {
      setValidate(true);
      onError && onError('');
      return;
    }

    if (!isEmpty(choice)) {
      setValidate(true);
      onError && onError('');
      return;
    }
    onError && onError('Chưa có lựa chọn');
    setValidate(false);
  }, [choice, customValidate, isRequired, onError]);

  const changeHandler = useCallback(
    (e) => {
      if (onChange) {
        onChange({ e, choice });
      }
      setChoice(e);
    },
    [choice, onChange]
  );

  return (
    <Select
      {...inputProps}
      defaultOptions
      onChange={changeHandler}
      closeMenuOnSelect={!isMulti}
      defaultValue={defaultValue}
      options={options}
      value={choice}
      getOptionLabel={(option) => option[labelKey]}
      getOptionValue={(option) => option[valueKey]}
      errorBorderColor="#ff0000"
      isInvalid={!validate}
    />
  );
});

export default memo(DropList);
