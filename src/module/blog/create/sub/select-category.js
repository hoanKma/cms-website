import { Flex } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { hasCategoryAtom } from '../recoil';

const SelectCategory = forwardRef((_, ref) => {
  const dropDownListRef = useRef();

  const subject = useRecoilValue(subjectAtom);

  const setCategory = useSetRecoilState(hasCategoryAtom);

  useImperativeHandle(ref, () => ({
    get: () => dropDownListRef.current.getValues(),
    validate: () => dropDownListRef.current.validate(),
    set: (value) => dropDownListRef.current?.setValues(value)
  }));

  const onChange = useCallback(() => {
    setCategory(true);
  }, [setCategory]);

  // if (id && isLoading) {
  //   return <LoadingScreen />;
  // }

  // if (id && !data) {
  //   return <ErrorScreen />;
  // }

  return (
    <Flex flexDirection="column" mt={2} zIndex={700}>
      <FieldLabel title="Môn" isRequired />
      <DropDownlist
        ref={dropDownListRef}
        name="SelectType222"
        placeholder="Chọn Môn"
        isClearable={false}
        isSearchable={false}
        isRequired={true}
        onChange={onChange}
        options={subject}
        defaultValue={subject[0]}
      />

      {/* {!!error && (
        <Text color="red" mt={0.5}>
          {error}
        </Text>
      )} */}
    </Flex>
  );
});

export default memo(SelectCategory);
