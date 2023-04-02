import { memo } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

const AppLinks = memo(({ mt }) => (
  <Flex direction="column" mt={mt} fontSize="md" color="gray.2" gap={3}>
    <Flex align="center" justify="center" mt={5}>
      <Box w={8} h={0.5} bg="gray.4" />
      <Text mx={4} color="gray.2">
        Tải ứng dụng
      </Text>
      <Box w={8} h={0.5} bg="gray.4" />
    </Flex>
  </Flex>
));

export default AppLinks;
