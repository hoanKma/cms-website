import { Flex, Heading } from '@chakra-ui/react';
import { memo } from 'react';

const ComingSoon = () => {
  return (
    <Flex justify="center" mt={20} w="full">
      <Heading>ComingSoon</Heading>
    </Flex>
  );
};

export default memo(ComingSoon);
