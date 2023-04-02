import { Flex, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import EffectScreen from 'component/effect-screen';
import Pagination from 'component/pagination';
import Table from 'component/table';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { QUESTION_LEVEL, SUBJECT_DATA, TABLE_CONFIG } from 'util/const';
import TableAction from './action';
import { useQueryTableDataQuestion } from './table.query';

const BlogTable = memo(() => {
  const header = useMemo(() => {
    return [
      {
        title: 'Môn',
        field: 'subjectId'
      },
      {
        title: 'Cấp độ',
        field: 'level'
      },
      {
        title: 'Nội dung',
        field: 'title'
      }
    ];
  }, []);

  const tableRef = useRef();
  const { data, isLoading, error } = useQueryTableDataQuestion();

  const params = useParams();
  const { page } = params;
  const queryClient = useQueryClient();
  const location = useLocation();

  useEffect(() => data && tableRef.current?.setNewData(data), [data]);
  useEffect(() => {
    if (location) {
      return () => {
        queryClient.removeQueries(['GET_TABLE_BLOG']);
      };
    }
  }, [location, queryClient]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['GET_TABLE_QUESTION']);
    };
  }, [queryClient]);

  const customRow = (field, data) => {
    if (field === 'subjectId') {
      const subject = SUBJECT_DATA.find((item) => item.value === data);
      return <Text>{subject.label}</Text>;
    }
    if (field === 'level') {
      return <Text>{QUESTION_LEVEL[data].label}</Text>;
    }
    if (field === 'title') {
      return <Text noOfLines={2} dangerouslySetInnerHTML={{ __html: data }} />;
    }
  };

  return (
    <Flex direction="column" w="full">
      <Table
        header={header}
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

export default BlogTable;
