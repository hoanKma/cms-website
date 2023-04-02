import { Flex, Text } from '@chakra-ui/react';
import Datepicker from 'base-component/datepicker';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { disableSubmitAtom, hasDateAtom } from './create.recoil';

const FieldTime = forwardRef((_, ref) => {
  const datepickerRef = useRef();
  const [error, setError] = useState();
  const params = useParams();
  const { id } = params;
  const setHasDate = useSetRecoilState(hasDateAtom);
  const setDisableSubmit = useSetRecoilState(disableSubmitAtom);

  const onError = useCallback((error) => setError(error), []);

  const onChange = useCallback(
    (e) => {
      if (id) {
        setDisableSubmit(!e);
      }
      setHasDate(!!e);
      setError((prev) => (e ? '' : prev));
    },
    [id, setDisableSubmit, setHasDate]
  );

  useImperativeHandle(ref, () => ({
    get: () => datepickerRef.current.get(),
    validate: () => datepickerRef.current.validate(),
    set: (value) => datepickerRef.current.set(value)
  }));

  return (
    <Flex direction="column" mt={10}>
      <FieldLabel title="Thời gian" isRequired />
      <Datepicker
        ref={datepickerRef}
        onError={onError}
        isHours
        isRequired
        dateFormat="dd/MM/yyyy HH:mm"
        onChange={onChange}
      />
      {!!error && (
        <Text color="red" mt={0.5}>
          {error}
        </Text>
      )}
    </Flex>
  );
});

export default memo(FieldTime);
