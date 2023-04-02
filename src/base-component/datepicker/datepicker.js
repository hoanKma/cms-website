import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import Date from './sub/date';
import RangeDate from './sub/range-date';

const Datepicker = forwardRef(
  (
    {
      name,
      defaultValue = undefined,
      dateFormat = 'dd/MM/yyyy',
      isClearable = true,
      placeHolder = 'dd/mm/yyyy',
      isRangeDate = false,
      isHours = false,
      isRequired = false,
      onChange,
      customValidate,
      onError
    },
    ref
  ) => {
    useImperativeHandle(ref, () => ({
      get: () => {
        return dateRef.current.get();
      },
      set: (newValue) => {
        dateRef.current.set(newValue);
      },
      validate: () => {
        return dateRef.current.validate();
      }
    }));

    const dateRef = useRef();

    if (isRangeDate) {
      return (
        <RangeDate
          ref={dateRef}
          name={name}
          defaultValue={defaultValue}
          dateFormat={dateFormat}
          isClearable={isClearable}
          placeHolder={placeHolder}
          isHours={isHours}
          customValidate={customValidate}
          onChange={onChange}
          onError={onError}
          isRequired={isRequired}
        />
      );
    }
    return (
      <Date
        ref={dateRef}
        name={name}
        defaultValue={defaultValue}
        dateFormat={dateFormat}
        isClearable={isClearable}
        placeHolder={placeHolder}
        isHours={isHours}
        customValidate={customValidate}
        onChange={onChange}
        onError={onError}
        isRequired={isRequired}
      />
    );
  }
);

export default memo(Datepicker);
