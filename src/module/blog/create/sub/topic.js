import { Flex } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import { useQueryTopicBySubject } from '../query';

const SelectTopic = forwardRef(({ subjectId }, ref) => {
  const dropDownListRef = useRef();

  const { data: topicData } = useQueryTopicBySubject(subjectId);

  useImperativeHandle(ref, () => ({
    get: () => dropDownListRef.current.getValues(),
    validate: () => dropDownListRef.current.validate(),
    set: (value) => dropDownListRef.current?.setValues(value)
  }));

  const onChange = useCallback(() => {}, []);

  // if (id && isLoading) {
  //   return <LoadingScreen />;
  // }

  // if (id && !data) {
  //   return <ErrorScreen />;
  // }

  return (
    <Flex flexDirection="column" mt={2} zIndex={700}>
      <FieldLabel title="Chuyên đề" isRequired />
      <DropDownlist
        ref={dropDownListRef}
        name="SelectType2223434"
        placeholder="Chọn chuyên đề"
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

export default memo(SelectTopic);
