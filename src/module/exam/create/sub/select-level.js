import { Flex } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import FieldLabel from 'component/field-label';
import { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { QUESTION_LEVEL } from 'util/const';
import { hasCategoryAtom } from '../recoil';

const SelectCategory = forwardRef((_, ref) => {
  const dropDownListRef = useRef();

  const setCategory = useSetRecoilState(hasCategoryAtom);

  useImperativeHandle(ref, () => ({
    get: () => dropDownListRef.current.getValues(),
    validate: () => dropDownListRef.current.validate(),
    set: (value) => dropDownListRef.current?.setValues(value)
  }));

  const onChange = useCallback(() => {
    setCategory(true);
  }, [setCategory]);

  return (
    <Flex flexDirection="column" mt={5} zIndex={600}>
      <FieldLabel title="Cấp độ" isRequired />
      <DropDownlist
        ref={dropDownListRef}
        name="SelectType222"
        placeholder="Chọn Cấp độ"
        isClearable={false}
        isSearchable={false}
        isRequired={true}
        onChange={onChange}
        options={QUESTION_LEVEL}
        defaultValue={QUESTION_LEVEL[0]}
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
