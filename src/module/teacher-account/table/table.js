import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import EffectScreen from 'component/effect-screen';
import Pagination from 'component/pagination';
import Table from 'component/table';
import dayjs from 'dayjs';
import { memo, useEffect, useMemo, useRef } from 'react';
import { TiTick } from 'react-icons/ti';
import { useParams } from 'react-router-dom';
import { TABLE_CONFIG } from 'util/const';
import { getTableHeader } from '../subs/data';
import TableAction from './action';
import { useQueryTableDataTeacherAccount } from './table.query';

const TeacherAccountTable = memo(() => {
  const tableRef = useRef();
  const { data, isLoading, error } = useQueryTableDataTeacherAccount();

  const params = useParams();
  const { page } = params;
  const tableHeader = useMemo(() => getTableHeader(page), [page]);

  useEffect(() => data?.data && tableRef.current?.setNewData(data?.data), [data]);

  const maxPage = useMemo(() => Math.ceil(data?.pagination?.total / 10), [data?.pagination?.total]);

  const customRow = (field, data) => {
    if (field === 'url') {
      return (
        <Link href={data} target="_blank" rel="noopener noreferrer" color="link.1" textDecoration={'underline'}>
          <Text fontWeight={500}>{data}</Text>
        </Link>
      );
    }

    if (field === 'createdAt') {
      return <Text>{dayjs(data).format('DD/MM/YYYY - HH:mm')}</Text>;
    }
    if (field === 'fileNum') {
      if (!data) {
        return null;
      }
      return <Text>{data}</Text>;
    }

    if (field === 'enable') {
      return data ? <Icon as={TiTick} color="green" boxSize={8} /> : <Icon as={TiTick} color="#999" boxSize={8} />;
    }
  };

  return (
    <Flex direction="column" w="full" gap={4}>
      <Text fontWeight={700}>Tổng số giáo viên: {data?.pagination?.total}</Text>

      <Table
        header={tableHeader}
        name={page}
        ref={tableRef}
        customRow={customRow}
        config={TABLE_CONFIG}
        action={(item) => <TableAction id={item.id} />}
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

export default TeacherAccountTable;
