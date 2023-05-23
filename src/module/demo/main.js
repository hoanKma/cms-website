import { Box, Flex } from '@chakra-ui/react';
import StatisticScreen from './sub/statistic-screen';

const Main = () => {
  return (
    <Flex direction={'column'} gap={4}>
      <Box>
        <StatisticScreen />
      </Box>
    </Flex>
  );
};

export default Main;
