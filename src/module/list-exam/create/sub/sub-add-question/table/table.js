import { Flex, Text } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import EffectScreen from 'component/effect-screen';
import Pagination from 'component/pagination';
import Table from 'component/table';
import { currentSubjectCreateAtom, questionIdInCreateExamAtomQueue } from 'module/list-exam/create/recoil';
import { memo, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { TABLE_CONFIG } from 'util/const';
import TableAction from './action';
import { useQueryTableDataQuestion } from './table.query';

const SubAddQuestionTable = memo(({ level, topicId }) => {
  const header = useMemo(() => {
    return [
      {
        title: 'Nội dung',
        field: 'title'
      }
    ];
  }, []);

  const tableRef = useRef();

  const currentSubjectCreate = useRecoilValue(currentSubjectCreateAtom);
  const setQuestionIdInCreateExamQueue = useSetRecoilState(questionIdInCreateExamAtomQueue);
  const resetQuestionIdInCreateExamQueue = useResetRecoilState(questionIdInCreateExamAtomQueue);

  const { data, isLoading, error } = useQueryTableDataQuestion({
    topicId,
    level,
    subjectId: currentSubjectCreate
  });

  const params = useParams();
  const { page } = params;
  const queryClient = useQueryClient();

  useEffect(() => data?.data && tableRef.current?.setNewData(data?.data), [data]);

  useEffect(() => {
    resetQuestionIdInCreateExamQueue();
  }, [resetQuestionIdInCreateExamQueue]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(['GET_TABLE_QUESTION_IN_CREATE_EXAM']);
    };
  }, [queryClient]);

  const maxPage = useMemo(() => Math.ceil(data?.pagination?.total / 10), [data?.pagination?.total]);

  const customRow = (field, data) => {
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
        action={(item) => <TableAction id={item.id} setQuestionIdInCreateExamQueue={setQuestionIdInCreateExamQueue} />}
        titleAction={'Chọn'}
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

export default SubAddQuestionTable;
