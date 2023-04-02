import { Flex, Text } from '@chakra-ui/react';
import { Input } from 'base-component';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { valueUrlAtom } from '../recoil';

const FieldScreen = forwardRef((_, ref) => {
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
    <Flex flexDirection="column" mt={10}>
      <FieldLabel title="Đường dẫn màn hình hiển thị" isRequired />
      <Flex direction={'column'} gap={4}>
        <Flex direction={'column'}>
          <Input ref={inputRef} required onError={onError} onChange={onChange} placeHolder="Ví dụ: /trang-chu" />

          {!!error && (
            <Text color="red" mt={0.5}>
              {error}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
});

export default memo(FieldScreen);
