import { Flex } from '@chakra-ui/react';
import { LoadMoreButton, LoadMorePaging, LoadMoreSpin } from 'base-component/load-more';
import { memo } from 'react';

export default memo(() => {
  return (
    <Flex
      gap={40}
      // mt="2000px"
    >
      <LoadMoreButton />
      <LoadMorePaging />
      <LoadMorePaging maxPage={3} />
      <LoadMoreSpin isLoading={true} onLoadMore={() => console.log('trigger load more')} />
    </Flex>
  );
});
