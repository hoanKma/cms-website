import { Flex } from '@chakra-ui/react';
import Loading from 'base-component/loading';
import { memo } from 'react';

export default memo(() => {
  return (
    <Flex mt={20} gap={5}>
      <Loading />
      <Loading size="xl" color="#8c429e" />
    </Flex>
  );
});
