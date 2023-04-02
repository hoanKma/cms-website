import { Flex } from '@chakra-ui/react';
import { memo } from 'react';
import FilterType from './subs/filter-type';
import FilterYear from './subs/filter-year';

const Filter = () => {
  return (
    <Flex w="full" gap={14}>
      <FilterType />
      <FilterYear />
    </Flex>
  );
};

export default memo(Filter);
