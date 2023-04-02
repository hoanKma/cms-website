import { Button, Flex, Text } from '@chakra-ui/react';
import Datepicker from 'base-component/datepicker';
import { useCallback, useRef, useState } from 'react';

const DatePickerDemo = () => {
  const datepickerRef = useRef();
  const rangeDatepickerRef = useRef();
  const [errorDateMessage, setErrorDateMessage] = useState();
  const [errorRangeDateMessage, setErrorRangeDateMessage] = useState();

  const setErrorDate = useCallback((errorMessage) => {
    setErrorDateMessage(errorMessage);
  }, []);

  const setErrorRangeDate = useCallback((errorMessage) => {
    setErrorRangeDateMessage(errorMessage);
  }, []);
  return (
    <Flex direction="column" gap={4}>
      <Text>Date thường</Text>
      <Datepicker
        ref={datepickerRef}
        setError={setErrorDate}
        isHours
        isRequired
        onChange={(date) => {
          console.log(date);
        }}
      />
      <Text>{errorDateMessage}</Text>
      <Text>RangeDate</Text>
      <Datepicker
        ref={rangeDatepickerRef}
        setError={setErrorRangeDate}
        isRangeDate
        onChange={(date) => console.log(date)}
        isRequired
      />
      <Text>{errorRangeDateMessage}</Text>
      <Button
        w="fit-content"
        px={4}
        onClick={() => {
          datepickerRef.current.get();
          // datepickerRef.current.set(1672419600000);
          // datepickerRef.current.validate();
          console.log('ha12-date', datepickerRef.current.get(), datepickerRef.current.validate());

          rangeDatepickerRef.current.get();
          rangeDatepickerRef.current.set({ startDate: 1672419600000, endDate: null });
          rangeDatepickerRef.current.validate();
          console.log('ha12-range-date', rangeDatepickerRef.current.get(), rangeDatepickerRef.current.validate());
        }}
      >
        Submit
      </Button>
    </Flex>
  );
};

export default DatePickerDemo;
