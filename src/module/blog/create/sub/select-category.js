import { Flex } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { currentSubjectCreateAtom } from '../recoil';

const SelectCategory = forwardRef((_, ref) => {
  const dropDownListRef = useRef();

  const subject = useRecoilValue(subjectAtom);

  // const setCategory = useSetRecoilState(hasCategoryAtom);
  const [currentSubjectCreate, setCurrentSubjectCreate] = useRecoilState(currentSubjectCreateAtom);

  const subject123 = useMemo(
    () => subject.find((item) => item.id === currentSubjectCreate) || {},
    [currentSubjectCreate, subject]
  );

  useImperativeHandle(ref, () => ({
    get: () => dropDownListRef.current.getValues(),
    validate: () => dropDownListRef.current.validate(),
    set: (value) => dropDownListRef.current?.setValues(value)
  }));

  const onChange = useCallback(
    (element) => {
      setCurrentSubjectCreate(element.e.id);
    },
    [setCurrentSubjectCreate]
  );

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
        defaultValue={subject123}
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
