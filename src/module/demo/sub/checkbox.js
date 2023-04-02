import { Button, Flex, Text } from '@chakra-ui/react';
import CheckboxComponent from 'base-component/checkbox/checkbox-component';
import { useRef } from 'react';

const DemoCheckbox = () => {
  const arrayValue = [
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!rem',
      value: '1'
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
      value: '2'
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
      value: '3'
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
      value: '4'
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
      value: '5'
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
      value: '6'
    },
    {
      name: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!',
      value: '7'
    }
  ];

  const defaultValue = ['1', '6'];

  const checkboxRef = useRef();

  return (
    <Flex direction="column" gap={4} maxW={'500px'}>
      <Text>Checkbox Group</Text>
      <CheckboxComponent arrayValue={arrayValue} defaultValue={defaultValue} numOfColumn={2} ref={checkboxRef} />
      <Button
        onClick={() => {
          checkboxRef.current.clearAll();
        }}
      >
        Clear All
      </Button>
    </Flex>
  );
};

export default DemoCheckbox;
