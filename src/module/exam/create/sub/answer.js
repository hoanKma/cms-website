import { memo, useRef } from 'react';

import { Flex } from '@chakra-ui/react';
import RadioBoxGroup from 'base-component/radio-box-group';
import FieldLabel from 'component/field-label/field-label';

const FormRadioGroup = memo(() => {
  const radioRef = useRef();

  const options = [
    {
      value: 'A',
      text: 'A. Nhập mã'
    },
    {
      value: 'B',
      text: 'B. Nhập tên'
    },
    {
      value: 'C',
      text: 'C. Nhập mã'
    },
    {
      value: 'D',
      text: 'D. Nhập tên'
    }
  ];

  return (
    <Flex direction="column" mt={10}>
      <FieldLabel title={'Đáp án'} isRequired />

      <RadioBoxGroup options={options} selectedValue={options[0].value} ref={radioRef} direction={'column'} />
    </Flex>
  );
});

export default FormRadioGroup;
