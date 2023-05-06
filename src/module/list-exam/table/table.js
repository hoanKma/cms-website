import { Flex, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import EffectScreen from 'component/effect-screen';
import Pagination from 'component/pagination';
import Table from 'component/table';
import dayjs from 'dayjs';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TABLE_CONFIG } from 'util/const';
import TableAction from './action';
import { useQueryTableDataListExam } from './table.query';

const ListExamTable = memo(() => {
  const header = useMemo(() => {
    return [
      {
        title: 'Tiêu đề',
        field: 'title'
      },
      {
        title: 'Số lần làm đề',
        field: 'numOfUse'
      },
      {
        title: 'Người tạo',
        field: 'creatorFullName'
      },
      {
        title: 'Ngày tạo',
        field: 'publishAt'
      }
    ];
  }, []);

  const tableRef = useRef();
  const { data, isLoading, error } = useQueryTableDataListExam();

  const params = useParams();
  const { page } = params;
  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => data?.data && tableRef.current?.setNewData(data?.data), [data]);

  useEffect(() => {
    if (location) {
      return () => {
        queryClient.removeQueries(['GET_TABLE_LIST_EXAM']);
      };
    }
  }, [location, queryClient]);

  const maxPage = useMemo(() => Math.ceil(data?.pagination?.total / 10), [data?.pagination?.total]);

  const customRow = (field, data) => {
    if (field === 'numOfUse') {
      return <Text textAlign={'center'}>{data}</Text>;
    }
    if (field === 'publishAt') {
      return <Text>{dayjs(data).format('DD/MM/YYYY - HH:mm')}</Text>;
    }
  };

  return (
    <Flex direction="column" w="full" gap={4}>
      <Text fontWeight={700}>Tổng số đề: {data?.pagination?.total}</Text>

      <Table
        header={header}
        name={page}
        ref={tableRef}
        customRow={customRow}
        config={TABLE_CONFIG}
        action={(item) => <TableAction id={item.id} item={item} />}
      />
      <EffectScreen
        isLoading={isLoading}
        errorMsg={error?.message}
        isNoData={!Array.isArray(data?.data) || !data?.data.length}
      />
      <Pagination maxPage={maxPage || 1} />
    </Flex>
  );
});

export default ListExamTable;
