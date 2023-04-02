import { Flex } from '@chakra-ui/react';
import { checkValue, convertTimestamp } from 'base-component/datepicker/helper';
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import EndDate from './end-date';
import StartDate from './start-date';

const RangeDate = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    get: () => {
      return { startDate: start, endDate: end };
    },
    set: (newValue) => {
      if (newValue) {
        const { startDate, endDate } = newValue ?? {};
        if (checkValue(startDate)) {
          setStartDate(startDate);
        }
        if (checkValue(endDate)) {
          setEndDate(endDate);
        }
      }
    },
    validate: () => {
      if (start > end || (isRequired && !startDate) || (isRequired && !endDate)) {
        checkValidate();
        return false;
      }
      if (typeof customValidate === 'function') {
        return customValidate({ startDate: start, endDate: end });
      }
      return !errorMessage;
    }
  }));

  const {
    defaultValue,
    customValidate,
    onError,
    onChange,
    name,
    isHours,
    placeHolder,
    dateFormat,
    isClearable,
    isRequired
  } = props;

  const [startDate, setStartDate] = useState(defaultValue?.startDate);
  const [endDate, setEndDate] = useState(defaultValue?.endDate);

  const start = useMemo(() => {
    return convertTimestamp(startDate);
  }, [startDate]);
  const end = useMemo(() => {
    return convertTimestamp(endDate);
  }, [endDate]);

  const [errorMessage, setErrorMessage] = useState(undefined);
  const firstTime = useRef(false);

  const checkValidate = useCallback(() => {
    if (typeof customValidate === 'function') {
      return customValidate({ startDate: start, endDate: end });
    }

    let error;
    if (start > end) {
      error = 'Vui lòng chọn ngày bắt đầu lớn hơn ngày kết thúc!';
    }
    if (isRequired) {
      if (!start && !end) {
        error = 'Vui lòng chọn trường này!';
      } else if (!start) {
        error = 'Vui lòng chọn ngày bắt đầu!';
      } else if (!end) {
        error = 'Vui lòng chọn ngày kết thúc!';
      }
    }
    setErrorMessage(error);
    if (onError && error) {
      onError(error);
    }
  }, [customValidate, end, isRequired, onError, start]);

  useEffect(() => {
    if (!firstTime.current) {
      firstTime.current = true;
      return;
    }
    checkValidate();
  }, [checkValidate]);

  const onChangeStartDate = useCallback(
    (date) => {
      if (typeof onChange === 'function') {
        const startDate = convertTimestamp(date);
        onChange({ startDate: startDate, endDate: end });
      }
      setStartDate(date);
    },
    [end, onChange]
  );

  const onChangeEndDate = useCallback(
    (date) => {
      if (typeof onChange === 'function') {
        const endDate = convertTimestamp(date);
        onChange({ startDate: start, endDate: endDate });
      }
      setEndDate(date);
    },
    [onChange, start]
  );

  return (
    <Flex direction="column" gap={1}>
      <StartDate
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeStartDate}
        errorMessage={errorMessage}
        name={name}
        isHours={isHours}
        placeHolder={placeHolder}
        dateFormat={dateFormat}
        isClearable={isClearable}
      />
      <EndDate
        startDate={startDate}
        endDate={endDate}
        onChange={onChangeEndDate}
        errorMessage={errorMessage}
        name={name}
        isHours={isHours}
        placeHolder={placeHolder}
        dateFormat={dateFormat}
        isClearable={isClearable}
      />
    </Flex>
  );
});

export default memo(RangeDate);
