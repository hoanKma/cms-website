import { Flex, Text } from '@chakra-ui/react';
import DropDownlist from 'base-component/drop-downlist';
import FieldLabel from 'component/field-label';
import isEmpty from 'lodash/isEmpty';
import { REPORT_TYPES } from 'module/bao-cao/subs/data';
import { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const FieldType = forwardRef((_, ref) => {
  const [error, setError] = useState();
  const dropDownListRef = useRef();
  const params = useParams();
  const { page } = params;

  const options = useMemo(
    () =>
      REPORT_TYPES.filter((item) => item.route === page).map((item) => ({
        value: item.value,
        label: item.label
      })),
    [page]
  );
  const onError = useCallback((error) => setError(error), []);

  const onChange = useCallback((e) => setError((prev) => (!isEmpty(e) ? '' : prev)), []);

  useImperativeHandle(ref, () => ({
    get: () => dropDownListRef.current.getValues(),
    validate: () => dropDownListRef.current.validate(),
    set: (value) => {
      const currentType = REPORT_TYPES.find((item) => item.value === value);
      dropDownListRef.current.setValues(currentType);
    }
  }));

  return (
    <Flex flexDirection="column" mt={10}>
      <FieldLabel title="Loại file" isRequired />
      <DropDownlist
        ref={dropDownListRef}
        name="SelectType"
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

export default memo(FieldType);
