import { Flex, Text } from '@chakra-ui/react';
import { memo, useCallback } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { questionIdInCreateExamAtom } from '../recoil';
import ExamUi from './exam-ui';

const ChangeOrderQuestion = () => {
  const [questionIdInCreate, setQuestionIdInCreate] = useRecoilState(questionIdInCreateExamAtom);

  const handleOnDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const items = Array.from(questionIdInCreate);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setQuestionIdInCreate(items);
    },
    [questionIdInCreate, setQuestionIdInCreate]
  );

  return (
    <Flex direction={'column'} gap={4}>
      <Text fontWeight={500}>Thứ tự hiển thị câu hỏi (Kéo thả để thay đổi vị trí)</Text>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="question">
          {(provided) => (
            <Flex
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction="column"
              border={'1px dashed #F7941D'}
              borderRadius="5px"
              padding={'10px'}
              gap={4}
            >
              {questionIdInCreate.map((element, index) => {
                return (
                  <Draggable key={element} draggableId={element} index={index}>
                    {(provided) => (
                      <Flex
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        align="center"
                        gap={5}
                      >
                        <ExamUi questionId={element} index={index} />
                      </Flex>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Flex>
          )}
        </Droppable>
      </DragDropContext>
    </Flex>
  );
};

export default memo(ChangeOrderQuestion);
