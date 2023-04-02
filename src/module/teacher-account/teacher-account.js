import { Flex } from '@chakra-ui/react';
import TableControl from 'component/table-control';
import queryString from 'query-string';
import { memo, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { paramsToObject } from 'util/helper';
import Filter from './table/filter';
import TeacherAccountTable from './table/table';

const TeacherAccount = () => {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const setSearchParams = useSearchParams()[1];
  const { title } = parsed;

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
    <Flex direction="column" w="full">
      <TableControl onSearch={onChangeSearch} createRoute="tao-moi" defaultSearchValue={title}>
        <Filter />
      </TableControl>

      <Flex mt={5} w="full">
        <TeacherAccountTable />
      </Flex>
    </Flex>
  );
};

export default memo(TeacherAccount);
