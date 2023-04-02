import { isEmpty } from 'lodash';
import { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

const DropListQuery = forwardRef((props, ref) => {
  const {
    name,
    isMulti,
    placeholder = 'Vui lòng lựa chọn',
    isClearable = true,
    isSearchable = true,
    isDisabled,
    defaultValue,
    options,
    isRequired,
    onError,
    customValidate,
    onChange,
    loadOptions,
    valueKey = 'label',
    labelKey = 'value'
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

  const [choice, setChoice] = useState(defaultValue);
  const [validate, setValidate] = useState(!!defaultValue);

  useImperativeHandle(ref, () => ({
    setValues: (newValue) => setChoice(newValue),

    getValues: () => {
      if (!isEmpty(choice)) {
        return choice;
      }
      return undefined;
    },

    validate: () => {
      if (typeof customValidate === 'function') {
        return customValidate(choice);
      }

      return validate;
    }
  }));

  const changeHandler = useCallback(
    (e) => {
      setChoice(e);

      onChange(e);

      if (typeof customValidate === 'function') {
        return;
      }

      if (!isRequired) {
        setValidate(true);
        onError(undefined);

        return;
      }

      if (!isEmpty(e)) {
        setValidate(true);
        onError(undefined);

        return;
      }
      onError('Chưa có lựa chọn');
      setValidate(false);
    },
    [customValidate, isRequired, onChange, onError]
  );

  return (
    <AsyncPaginate
      {...inputProps}
      loadOptions={loadOptions}
      getOptionLabel={(option) => option[labelKey]}
      getOptionValue={(option) => option[valueKey]}
      onChange={changeHandler}
    />
  );
});

export default memo(DropListQuery);
