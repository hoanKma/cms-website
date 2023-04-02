import { Flex, Text } from '@chakra-ui/react';
import { Input } from 'base-component';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { valueUrlAtom } from '../recoil';

const Username = forwardRef((_, ref) => {
  const inputRef = useRef();
  const [error, setError] = useState();

  const setValueUrlAtom = useSetRecoilState(valueUrlAtom);

  const onError = useCallback((error) => setError(error), []);

  const onChange = useCallback(
    (e) => {
      setValueUrlAtom(e.target.value);
      setError((prev) => (e.target.value.trim() ? '' : prev));
    },
    [setValueUrlAtom]
  );

  useImperativeHandle(ref, () => ({
    get: () => inputRef.current.get(),
    validate: () => inputRef.current.validate(),
    set: (value) => inputRef.current.set(value)
  }));

  return (
    <Flex flexDirection="column" mt={5}>
      <FieldLabel title="Username Giáo viên" isRequired />
      <Input ref={inputRef} required onError={onError} onChange={onChange} placeHolder={'Nhập username giáo viên'} />

      {!!error && (
        <Text color="red" mt={0.5}>
          {error}
        </Text>
      )}
    </Flex>
  );
});

export default memo(Username);
