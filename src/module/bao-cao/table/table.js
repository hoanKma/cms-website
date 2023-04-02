import { Flex, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import EffectScreen from 'component/effect-screen';
import Pagination from 'component/pagination';
import Table from 'component/table';
import dayjs from 'dayjs';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TABLE_CONFIG } from 'util/const';
import { getTableHeader } from '../subs/data';
import TableAction from './action';
import { useQueryTableData } from './table.query';

const InfoDisclosureTable = memo(() => {
  const tableRef = useRef();
  const { data, isLoading, error } = useQueryTableData();
  const params = useParams();
  const { page } = params;
  const tableHeader = useMemo(() => getTableHeader(page), [page]);
  const queryClient = useQueryClient();

  useEffect(() => data && tableRef.current?.setNewData(data), [data]);
  useEffect(() => {
    return () => queryClient.removeQueries(['GET_TABLE_REPORT']);
  }, [queryClient]);

  const customRow = (field, data) => {
    if (field === 'title') {
      return <Text fontWeight={500}>{data}</Text>;
    }
    if (field === 'fileNum') {
      return <Text>{data || 0}</Text>;
    }
    if (field === 'date') {
      return <Text>{dayjs(data).format('DD/MM/YYYY - HH:mm')}</Text>;
    }
    if (field === 'description') {
      return <Text noOfLines={2} dangerouslySetInnerHTML={{ __html: data }} />;
    }
    if (field === 'more_info') {
      return <Text>{data}</Text>;
    }
  };

  return (
    <Flex direction="column" w="full">
      <Table
        header={tableHeader}
        name={page}
        ref={tableRef}
        customRow={customRow}
        config={TABLE_CONFIG}
        action={(item) => <TableAction id={item.id} />}
      />
      <EffectScreen isLoading={isLoading} errorMsg={error?.message} isNoData={!Array.isArray(data) || !data.length} />
      <Pagination />
    </Flex>
  );
});

export default InfoDisclosureTable;
