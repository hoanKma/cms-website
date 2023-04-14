import { Flex } from '@chakra-ui/react';
import { ButtonEdit, ButtonView } from 'component/button';
import DeleteConfirmButton from 'component/delete-confirm-button';
import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useMutationDeleteQuestion } from './mutate';

const TableAction = ({ id }) => {
  const { isLoading, mutate: deleteQuestion } = useMutationDeleteQuestion();

  const onDelete = useCallback(() => deleteQuestion(id), [deleteQuestion, id]);

  return (
    <Flex alignItems="center" gap={4}>
      <Link to={`chi-tiet/${id}`}>
        <ButtonView />
      </Link>
      <Link to={`cap-nhat/${id}`}>
        <ButtonEdit />
      </Link>
      <DeleteConfirmButton onConfirm={onDelete} isLoading={isLoading} />
    </Flex>
  );
};

export default memo(TableAction);
