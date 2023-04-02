import { Flex, Text } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import FieldLabel from 'component/field-label';
import isEmpty from 'lodash/isEmpty';
import { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';

const FieldYear = forwardRef((_, ref) => {
  const [error, setError] = useState();
  const dropDownListRef = useRef();

  const options = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => i + 2017)
        .reverse()
        .map((item) => ({ value: item, label: item })),
    []
  );
  const onError = useCallback((error) => setError(error), []);

  const onChange = useCallback((e) => setError((prev) => (!isEmpty(e) ? '' : prev)), []);

  useImperativeHandle(ref, () => ({
    get: () => dropDownListRef.current.getValues(),
    validate: () => dropDownListRef.current.validate(),
    set: (value) => dropDownListRef.current.setValues(value)
  }));

  return (
    <Flex flexDirection="column" mt={10}>
      <FieldLabel title="Năm" isRequired />
      <DropDownlist
        ref={dropDownListRef}
        name="SelectYear"
        placeholder="Chọn..."
        isMulti={false}
        onChange={onChange}
        isClearable={false}
        isSearchable={false}
        isRequired
        options={options}
        defaultValue={options[0]}
        onError={onError}
      />
      {!!error && (
        <Text color="red" mt={0.5}>
          {error}
        </Text>
      )}
    </Flex>
  );
});

export default memo(FieldYear);
