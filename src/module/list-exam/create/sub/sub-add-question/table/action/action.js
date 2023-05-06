import { Checkbox, Flex } from '@chakra-ui/react';
import { memo, useCallback } from 'react';

const TableAction = ({ id, setQuestionIdInCreateExamQueue }) => {
  const onChange = useCallback(
    (item) => {
      if (item.target.checked) {
        setQuestionIdInCreateExamQueue((prev) => [...prev, id]);
      } else {
        setQuestionIdInCreateExamQueue((prevState) => prevState.filter((element) => element !== id));
      }
    },
    [id, setQuestionIdInCreateExamQueue]
  );

  return (
    <Flex justify={'center'}>
      <Checkbox onChange={onChange}></Checkbox>
    </Flex>
  );
};

export default memo(TableAction);
