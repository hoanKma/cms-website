import { Flex, Text } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';

const SelectType = forwardRef((_, ref) => {
  const [error, setError] = useState();
  const dropDownListRef = useRef();

  const subject = useRecoilValue(subjectAtom);

  useEffect(() => {
    if (error) {
      setError('Vui lòng lựa chọn');
    }
  }, [error]);

  const onError = useCallback((error) => setError(error), []);

  useImperativeHandle(ref, () => ({
    get: () => dropDownListRef.current.getValues(),
    validate: () => dropDownListRef.current.validate(),
    set: (value) => dropDownListRef.current.setValue(value)
  }));

  const onChange = useCallback(({ e, choice }) => {
    // setData(e);
  }, []);

  return (
    <Flex flexDirection="column" mt={5}>
      <FieldLabel title="Môn" isRequired />
      <DropDownlist
        ref={dropDownListRef}
        name="SelectType"
        placeholder="Chọn môn"
        isClearable={false}
        isSearchable={false}
        onError={onError}
        options={subject}
        isMulti={true}
        isRequired={true}
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

export default memo(SelectType);
