import { Flex, Text } from '@chakra-ui/react';
import Datepicker from 'base-component/datepicker';
import FieldLabel from 'component/field-label';
import dayjs from 'dayjs';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';

const PublishDate = forwardRef((_, ref) => {
  const datepickerRef = useRef();
  const [error, setError] = useState();

  const published_date = dayjs().valueOf();

  const onError = useCallback((error) => setError(error), []);

  const onChange = useCallback(() => {}, []);

  useImperativeHandle(ref, () => ({
    get: () => datepickerRef.current.get(),
    validate: () => datepickerRef.current.validate(),
    set: (value) => datepickerRef.current.set(value)
  }));

  return (
    <Flex direction="column" mt={10}>
      <FieldLabel title="Thời gian xuất bản" isRequired />
      <Datepicker
        ref={datepickerRef}
        onError={onError}
        isHours
        isRequired
        dateFormat="dd/MM/yyyy HH:mm"
        onChange={onChange}
        isClearable={false}
        defaultValue={published_date}
      />
      {!!error && (
        <Text color="red" mt={0.5}>
          {error}
        </Text>
      )}
    </Flex>
  );
});

export default memo(PublishDate);
