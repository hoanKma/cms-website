import { Button, Flex, Text } from '@chakra-ui/react';
import FieldLabel from 'component/field-label';
import { memo, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRecoilState } from 'recoil';
import { questionIdInCreateExamAtom } from '../recoil';
import Card from './card';

const CreateQuestion = () => {
  const [questionIdInCreate, setQuestionIdInCreate] = useRecoilState(questionIdInCreateExamAtom);
  console.log('questionIdInCreate', questionIdInCreate.length);
  useEffect(() => {
    setQuestionIdInCreate([
      '644568da4d0d87ce91a433d8',
      '64456b504d0d87ce91a435e2',
      '6445778e4d0d87ce91a43ab2',
      '644ab781b676fd97571bab77',
      '6446a8c623a3df6d2e68bef2',
      '6446b37949befc15f38bb384',
      '644561c54d0d87ce91a430af',
      '6446b79049befc15f38bb48f',
      '644ab625b676fd97571baaeb',
      '644ab52ab676fd97571baa82',
      '644564404d0d87ce91a4316f',
      '644aa99789d455ab19e51242',
      '644692dd4d0d87ce91a43d54',
      '6446903d4d0d87ce91a43ce1',
      '6445778e4d0d87ce91a43ab2',
      '644571a44d0d87ce91a43978',
      '64456bd34d0d87ce91a4365e',
      '6446a59f23a3df6d2e68be94',
      '6446a76a23a3df6d2e68bed6',
      '6446a0164d0d87ce91a43f13',
      '6446a8c623a3df6d2e68bef2',
      '6446b4ac49befc15f38bb3b9',
      '6446ac6d23a3df6d2e68c0df',
      '644ab5d5b676fd97571baacc',
      '6446b37949befc15f38bb384',
      '6446ae8125e513f27a578157',
      '6446b21a25e513f27a578173',
      '6446b58249befc15f38bb433',
      '6446b61449befc15f38bb44f',
      '64456d034d0d87ce91a43739',
      '644692dd4d0d87ce91a43d54',
      '6446ac6d23a3df6d2e68c0df',
      '6446b61449befc15f38bb44f',
      '6446b58249befc15f38bb433',
      '6446ae8125e513f27a578157',
      '6446b37949befc15f38bb384',
      '6446b21a25e513f27a578173',
      '644568da4d0d87ce91a433d8',
      '644ab781b676fd97571bab77',
      '6446a76a23a3df6d2e68bed6',
      '6446a8c623a3df6d2e68bef2',
      '6446a59f23a3df6d2e68be94',
      '6446a0164d0d87ce91a43f13',
      '644ab5d5b676fd97571baacc',
      '6446ac6d23a3df6d2e68c0df',
      '6446b4ac49befc15f38bb3b9',
      '6446b37949befc15f38bb384',
      '6446ae8125e513f27a578157',
      '6446b21a25e513f27a578173',
      '6446b61449befc15f38bb44f'
    ]);
  }, [setQuestionIdInCreate]);

  const [cards, setCards] = useState([
    {
      id: 1,
      text: 'JavaScript'
    },
    {
      id: 2,
      text: 'Python'
    },
    {
      id: 3,
      text: 'Go'
    },
    {
      id: 4,
      text: 'Java'
    },
    {
      id: 5,
      text: 'Ruby'
    },
    {
      id: 6,
      text: 'C++'
    }
  ]);

  const handleDrag = (dragIndex, hoverIndex) => {
    setCards((prev) => {
      const copy = [...prev];
      const card = copy[dragIndex];
      // remove origin
      copy.splice(dragIndex, 1);
      // add to target
      copy.splice(hoverIndex, 0, card);
      return copy;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Flex flexDirection="column" mt={5}>
        <FieldLabel title="Danh sách câu hỏi" isRequired />
        <Button>Thêm câu hỏi</Button>

        <Text my={5} textDecoration={'underline'}>
          Kéo thả câu hỏi để thay đổi vị trí
        </Text>
        {/* <Flex direction="column" border={'1px dashed #F7941D'} borderRadius="5px" padding={'10px'} gap={4}>
        {questionIdInCreate.map((element, index) => {
          return (
            <Fragment key={index}>
              <ExamUi questionId={element} index={index} />
            </Fragment>
          );
        })}
      </Flex> */}

        {cards.map((item, index) => (
          <Card key={item.id} index={index} text={item.text} handleDrag={handleDrag} state={cards} />
        ))}
      </Flex>
    </DndProvider>
  );
};

export default memo(CreateQuestion);
