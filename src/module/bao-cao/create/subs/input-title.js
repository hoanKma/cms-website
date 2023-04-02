import { Flex, Text } from '@chakra-ui/react';
import Input from 'base-component/input';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { disableSubmitAtom, hasTitleAtom } from './create.recoil';

const FieldTitle = forwardRef((_, ref) => {
  const inputRef = useRef();
  const [error, setError] = useState();
  const params = useParams();
  const { id } = params;
  const setHasTitle = useSetRecoilState(hasTitleAtom);
  const setDisableSubmit = useSetRecoilState(disableSubmitAtom);

  const onError = useCallback((error) => setError(error), []);

  const onChange = useCallback(
    (e) => {
      const value = e.target.value.trim();
      if (id) {
        setDisableSubmit(!value);
      }
      setHasTitle(!!value);
      setError((prev) => (value ? '' : prev));
    },
    [id, setDisableSubmit, setHasTitle]
  );

  useImperativeHandle(ref, () => ({
    get: () => inputRef.current.get(),
    validate: () => inputRef.current.validate(),
    set: (value) => inputRef.current.set(value)
  }));

  return (
    <Flex flexDirection="column">
      <FieldLabel title="Tiêu đề" isRequired />
      <Input ref={inputRef} onError={onError} required onChange={onChange} />
      {!!error && (
        <Text color="red" mt={0.5}>
          {error}
        </Text>
      )}
    </Flex>
  );
});

export default memo(FieldTitle);
