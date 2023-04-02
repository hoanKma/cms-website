import { Checkbox, CheckboxGroup, Flex, Text } from '@chakra-ui/react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';

export default forwardRef((props, ref) => {
  const { arrayValue, defaultValue, numOfColumn, isRequired, customValidate, onError } = props;
  const [values, setValues] = useState(defaultValue);
  const firstTime = useRef(false);

  useImperativeHandle(ref, () => ({
    get: () => values,
    validate: () => {
      if (isRequired) {
        return checkValidate();
      }
      if (typeof customValidate === 'function') {
        return customValidate(values);
      }

      return true;
    },
    clearAll: () => setValues([])
  }));

  const checkValidate = useCallback(() => {
    if (typeof customValidate === 'function') {
      return customValidate(values);
    }

    if (isRequired && !values) {
      onError('Vui lòng chọn giá trị');
      return false;
    }

    return true;
  }, [customValidate, isRequired, onError, values]);

  useEffect(() => {
    if (!firstTime.current) {
      firstTime.current = true;
      return;
    }
    checkValidate();
  }, [checkValidate]);

  return (
    <CheckboxGroup colorScheme="orange" onChange={(e) => setValues(e)} value={values}>
      <Flex wrap={'wrap'}>
        {arrayValue.map(({ name, value }, index) => {
          return (
            <Flex gap={3} key={index} maxW={`calc(100%/${numOfColumn || 2})`} padding={'10px'}>
              <Checkbox id={`custom-checkbox-${index}`} name={name} value={value} />
              <Text htmlFor={`custom-checkbox-${index}`}>{name}</Text>
            </Flex>
          );
        })}
      </Flex>
    </CheckboxGroup>
  );
});
