import { Flex } from '@chakra-ui/react';
import TableControl from 'component/table-control';
import queryString from 'query-string';
import { memo, useCallback, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { paramsToObject } from 'util/helper';
import { useResetAtom } from './create/custom-hook';
import ListExamTable from './table';
import Filter from './table/filter';

const Blog = () => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const setSearchParams = useSearchParams()[1];
  const { title } = parsed;

  const resetAtom = useResetAtom();

  useEffect(() => {
    resetAtom();
  }, [resetAtom]);

  const onChangeSearch = useCallback(
    (keyword) => {
      setSearchParams((curr) => {
        const clone = paramsToObject(curr.entries());
        return new URLSearchParams({ ...clone, title: keyword });
      });
    },
    [setSearchParams]
  );

  return (
    <Flex direction="column" w="full" gap={5}>
      <Filter />

      <TableControl onSearch={onChangeSearch} createRoute="tao-moi" defaultSearchValue={title}></TableControl>

      <Flex mt={10} w="full">
        <ListExamTable />
      </Flex>
    </Flex>
  );
};

export default memo(Blog);
