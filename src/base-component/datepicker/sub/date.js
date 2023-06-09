import vn from 'date-fns/locale/vi';
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { checkValue, convertTimestamp } from '../helper';
import CustomInput from './custom-input';

const DateComponent = forwardRef(
  (
    {
      name,
      defaultValue,
      dateFormat = 'dd/MM/yyyy',
      isClearable,
      placeHolder,
      isRangeDate,
      isHours,
      onChange,
      customValidate,
      onError,
      isRequired,
      isDisabled,
      minDate,
      maxDate
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      get: () => {
        return timestamp;
      },
      set: (newValue) => {
        if (checkValue(newValue)) setSelected(newValue);
      },
      validate: () => {
        if (isRequired && !timestamp) {
          checkValidate();
          return false;
        }
        if (typeof customValidate === 'function') {
          return customValidate(timestamp);
        }
        return !errorMessage;
      }
    }));

    const [selected, setSelected] = useState(defaultValue);

    const timestamp = useMemo(() => {
      return convertTimestamp(selected);
    }, [selected]);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const firstTime = useRef(false);

    const checkValidate = useCallback(() => {
      if (typeof customValidate === 'function') {
        return customValidate(timestamp);
      }

      let error;
      if (isRequired && !timestamp) {
        error = 'Vui lòng nhập trường này!';
      }
      setErrorMessage(error);
      if (onError && error) {
        onError(error);
      }
    }, [customValidate, isRequired, onError, timestamp]);

    const onChangeDatepicker = useCallback(
      (date) => {
        if (typeof onChange === 'function') {
          const day = convertTimestamp(date);
          onChange(day);
        }
        setSelected(date);
      },
      [onChange]
    );

    useEffect(() => {
      if (!firstTime.current) {
        firstTime.current = true;
        return;
      }
      checkValidate();
    }, [checkValidate]);
    if (!isHours) {
      return (
        <DatePicker
          locale={vn}
          dropdownMode="select"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          customInput={<CustomInput error={errorMessage} isDisabled={isDisabled} />}
          placeholderText={placeHolder}
          name={name}
          dateFormat={dateFormat}
          showTimeSelect={isHours}
          isClearable={isClearable}
          selectsRange={isRangeDate}
          onChange={onChangeDatepicker}
          selected={selected}
          disabled={isDisabled}
          minDate={minDate}
          maxDate={maxDate}
        />
      );
    }

    return (
      <DatePicker
        locale={vn}
        dropdownMode="select"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        customInput={<CustomInput error={errorMessage} isDisabled={isDisabled} />}
        placeholderText={placeHolder}
        name={name}
        isClearable={isClearable}
        selectsRange={isRangeDate}
        onChange={onChangeDatepicker}
        selected={selected}
        disabled={isDisabled}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy HH:mm"
        showTimeInput
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  }
);

export default memo(DateComponent);
