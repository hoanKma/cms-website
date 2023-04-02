import { memo, useRef } from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';
import RadioBoxGroup from 'base-component/radio-box-group';

const FormRadioGroup = memo(() => {
  const radioRef = useRef();

  const options = [
    {
      value: 'symbol',
      text: 'Nhập mã'
    },
    {
      value: 'name',
      text: 'Nhập tên'
    }
  ];

  return (
    <Flex gap={4} direction="column">
      <Text>{'Hoan LN'}</Text>
      <RadioBoxGroup options={options} selectedValue={options[0].value} ref={radioRef} />
      <Button
        onClick={() => {
          radioRef.current.clearAll();
        }}
      >
        Clear All
      </Button>
    </Flex>
  );
});

export default FormRadioGroup;
