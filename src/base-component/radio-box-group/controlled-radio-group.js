import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { Flex, Radio, RadioGroup } from '@chakra-ui/react';
import { useEffect } from 'react';

const ControlledRadioGroup = forwardRef((props, ref) => {
  const { options, selectedValue, customValidate, isRequired, onError, numOfColumn } = props;
  const [value, setValue] = useState(selectedValue);
  const firstTime = useRef(false);

  useImperativeHandle(ref, () => ({
    get: () => value,
    validate: () => {
      if (isRequired) {
        return checkValidate();
      }
      if (typeof customValidate === 'function') {
        return customValidate(value);
      }

      return true;
    },
    clearAll: () => setValue()
  }));

  const checkValidate = useCallback(() => {
    if (typeof customValidate === 'function') {
      return customValidate(value);
    }

    if (isRequired && !value) {
      onError('Vui lòng chọn giá trị');
      return false;
    }

    return true;
  }, [customValidate, isRequired, onError, value]);

  useEffect(() => {
    if (!firstTime.current) {
      firstTime.current = true;
      return;
    }
    checkValidate();
  }, [checkValidate]);

  return (
    <RadioGroup
      onChange={(e) => {
        setValue(e);
      }}
      value={value}
    >
      <Flex wrap={'wrap'}>
        {options.map((option, index) => (
          <Flex gap={3} key={index} maxW={`calc(100%/${numOfColumn || 2})`} padding={'10px'}>
            <Radio key={index} value={option.value} name={option.text}>
              {option.text}
            </Radio>
          </Flex>
        ))}
      </Flex>
    </RadioGroup>
  );
});

export default ControlledRadioGroup;
