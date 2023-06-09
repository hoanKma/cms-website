import { Flex } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { useQueryTopicBySubject } from '../query';
import { currentSubjectCreateAtom } from '../recoil';

const SelectTopic = forwardRef((_, ref) => {
  const dropDownListRef = useRef();

  const currentSubjectCreate = useRecoilValue(currentSubjectCreateAtom);

  const { data: topicData } = useQueryTopicBySubject(currentSubjectCreate);

  useImperativeHandle(ref, () => ({
    get: () => dropDownListRef.current.getValues(),
    validate: () => dropDownListRef.current.validate(),
    set: (value) => dropDownListRef.current?.setValues(value)
  }));

  const onChange = useCallback(() => {}, []);

  return (
    <Flex flexDirection="column" mt={5} zIndex={600}>
      <FieldLabel title="Chuyên đề" isRequired />
      <DropDownlist
        ref={dropDownListRef}
        name="SelectType2223434"
        placeholder="Chọn chuyên đề"
        isClearable={false}
        isSearchable={false}
        isRequired={true}
        onChange={onChange}
        options={topicData}
        defaultValue={topicData?.[0]}
        valueKey="id"
        labelKey="title"
      />
    </Flex>
  );
});

export default memo(SelectTopic);
