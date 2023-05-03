import { Flex, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import EffectScreen from 'component/effect-screen';
import Pagination from 'component/pagination';
import Table from 'component/table';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { QUESTION_LEVEL, TABLE_CONFIG } from 'util/const';
import { currentSubjectCreateAtom } from '../create/recoil';
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
        title: 'Chuyên đề',
        field: 'topicTitle'
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

  const setCurrentSubjectCreate = useSetRecoilState(currentSubjectCreateAtom);

  const searchParams = new URLSearchParams(location?.search);
  const subjectId = searchParams.get('subjectId');

  useEffect(() => {
    setCurrentSubjectCreate(subjectId);
  }, [setCurrentSubjectCreate, subjectId]);

  const subject = useRecoilValue(subjectAtom);

  useEffect(() => data?.data && tableRef.current?.setNewData(data?.data), [data]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['GET_TABLE_QUESTION']);
    };
  }, [queryClient]);

  const customRow = (field, data) => {
    if (field === 'subjectId') {
      const subject123 = subject.find((item) => item.id === data) || {};

      return <Text>{subject123?.label}</Text>;
    }
    if (field === 'level') {
      return <Text>{QUESTION_LEVEL[data - 1]?.label}</Text>;
    }
    if (field === 'title') {
      return <Text noOfLines={2} dangerouslySetInnerHTML={{ __html: data }} />;
    }
  };

  return (
    <Flex direction="column" w="full" gap={4}>
      <Text fontWeight={700}>Tổng số câu: {data?.pagination?.total}</Text>
      <Table
        header={header}
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
      <Pagination />
    </Flex>
  );
});

export default BlogTable;
