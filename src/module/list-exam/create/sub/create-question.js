import { Button, Flex } from '@chakra-ui/react';
import FieldLabel from 'component/field-label';
import { memo, useEffect, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { currentSubjectCreateAtom, questionIdInCreateExamAtom } from '../recoil';
import ChangeOrderQuestion from './change-order-question';

const CreateQuestion = () => {
  const subject = useRecoilValue(subjectAtom);

  const [questionIdInCreate, setQuestionIdInCreate] = useRecoilState(questionIdInCreateExamAtom);

  const currentSubjectCreate = useRecoilValue(currentSubjectCreateAtom);

  const subject123 = useMemo(
    () => subject.find((item) => item.id === currentSubjectCreate) || {},
    [currentSubjectCreate, subject]
  );

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

  return (
    <Flex flexDirection="column" my={5}>
      <FieldLabel title="Danh sách câu hỏi" isRequired />
      {questionIdInCreate.length < subject123?.questionNumber && <Button my={5}>Thêm câu hỏi</Button>}

      <ChangeOrderQuestion questionList={questionIdInCreate} />
    </Flex>
  );
};

export default memo(CreateQuestion);
