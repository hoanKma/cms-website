import { Flex } from '@chakra-ui/react';
import TableControl from 'component/table-control';
import queryString from 'query-string';
import { memo, useCallback } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { paramsToObject } from 'util/helper';
import { ROUTES_DATA } from './subs/data';
import ReportTable from './table';
import Filter from './table/filter';

const Report = () => {
  const params = useParams();
  const { page } = params;
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

  if (!ROUTES_DATA.includes(page)) {
    return <div>404</div>;
  }

  return (
    <Flex direction="column" w="full">
      <TableControl onSearch={onChangeSearch} createRoute="tao-moi" defaultSearchValue={title}>
        <Filter />
      </TableControl>

      <Flex mt={10} w="full">
        <ReportTable />
      </Flex>
    </Flex>
  );
};

export default memo(Report);
