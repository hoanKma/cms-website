import { Flex } from '@chakra-ui/react';
import { LoadMorePaging } from 'base-component/load-more';
import queryString from 'query-string';
import { memo, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { paramsToObject } from 'util/helper';

const Pagination = ({ maxPage }) => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const { page = 1 } = parsed;
  const setSearchParams = useSearchParams()[1];

  const onChangePage = useCallback(
    (page) => {
      setSearchParams((curr) => {
        const clone = paramsToObject(curr.entries());
        return new URLSearchParams({ ...clone, page });
      });
    },
    [setSearchParams]
  );

  return (
    <Flex mt={10} justifyContent="flex-end">
      <LoadMorePaging defaultValue={parseInt(page)} onChange={onChangePage} maxPage={maxPage} />
    </Flex>
  );
};

export default memo(Pagination);
