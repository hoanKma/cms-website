import { Flex, Switch } from '@chakra-ui/react';
import { ButtonBack, ButtonSubmit } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import FieldLabel from 'component/field-label/field-label';
import { isEmpty } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { userInfoAtom } from 'state-management/user-info';
import { QUESTION_LEVEL } from 'util/const';
import { useQueryDetailQuestion } from '../table/table.query';
import { useMutationCreateQuestion, useMutationUpdateQuestion } from './mutate';
import { correctAnswerAtom } from './recoil';
import FieldAnswerA from './sub/field-answer-a';
import FieldAnswerB from './sub/field-answer-b';
import FieldAnswerC from './sub/field-answer-c';
import FieldAnswerD from './sub/field-answer-d';
import FieldContent from './sub/input-content';
import InputExplan from './sub/input-explan';
import SelectCategory from './sub/select-category';
import SelectLevel from './sub/select-level';
import SelectTopic from './sub/select-topic';

const BlogCreate = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const contentRef = useRef();
  const categoryRef = useRef();
  const levelRef = useRef();
  const explanRef = useRef();
  const topicRef = useRef();
  const answerARef = useRef();
  const answerBRef = useRef();
  const answerCRef = useRef();
  const answerDRef = useRef();
  const [isSecurity, setSecurity] = useState(false);

  // const [disable, setDisable] = useState(false);

  const userInfo = useRecoilValue(userInfoAtom);
  const [correctAnswer, setCorrectAnswer] = useRecoilState(correctAnswerAtom);

  const subject = useRecoilValue(subjectAtom);

  const { id: teacherId } = userInfo;

  const { isLoading: loadingDetail, data: infoDetail, error: errorDetail } = useQueryDetailQuestion(id);

  const { mutate: createQuestion, isLoading: loadingCreate } = useMutationCreateQuestion();
  const { mutate: updateQuestion, isLoading: loadingUpdate } = useMutationUpdateQuestion(id);

  const loadingAction = useMemo(() => loadingCreate || loadingUpdate, [loadingCreate, loadingUpdate]);

  useEffect(() => {
    if (id && !isEmpty(infoDetail)) {
      const { subjectId, level, topicTitle, topicId, isSecurity, title, explanation, answers } = infoDetail;
      answers.map((element, index) => {
        const { isCorrect, label, value } = element || {};
        if (isCorrect) {
          setCorrectAnswer(index + 1);
        }
        switch (value) {
          case 'A':
            answerARef.current.setHtml(label);
            return null;
          case 'B':
            answerBRef.current.setHtml(label);
            return null;
          case 'C':
            answerCRef.current.setHtml(label);
            return null;
          case 'D':
            answerDRef.current.setHtml(label);
            return null;
          default:
            return null;
        }
      });
      contentRef.current.setHtml(title);
      explanRef.current.setHtml(explanation);
      setSecurity(isSecurity);

      const subject123 = subject.find((item) => item.id === subjectId) || {};
      categoryRef.current.set(subject123);

      topicRef.current.set({ title: topicTitle, id: topicId });
      levelRef.current.set(QUESTION_LEVEL[level - 1]);
    }
  }, [id, infoDetail, setCorrectAnswer, subject]);

  const onGoBack = useCallback(() => navigate(-1), [navigate]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const subjectId = categoryRef?.current?.get()?.id;
      const level = levelRef?.current?.get()?.value;
      const topicId = topicRef?.current?.get()?.id;
      const title = contentRef?.current?.getHtml();
      const explanation = explanRef?.current?.getHtml();
      const answerA = answerARef?.current?.getHtml();
      const answerB = answerBRef?.current?.getHtml();
      const answerC = answerCRef?.current?.getHtml();
      const answerD = answerDRef?.current?.getHtml();

      const params = {
        title,
        explanation,
        subjectId,
        security: isSecurity,
        level,
        teacherId,
        topicId,
        answers: [
          { value: 'A', label: answerA, isCorrect: correctAnswer === 1 ? true : false },
          { value: 'B', label: answerB, isCorrect: correctAnswer === 2 ? true : false },
          { value: 'C', label: answerC, isCorrect: correctAnswer === 3 ? true : false },
          { value: 'D', label: answerD, isCorrect: correctAnswer === 4 ? true : false }
        ],
        status: 'ACTIVE'
      };

      if (id) {
        updateQuestion(params);
      } else {
        createQuestion(params);
      }
    },
    [correctAnswer, createQuestion, id, isSecurity, teacherId, updateQuestion]
  );

  const onChangeSwitch = useCallback((e) => {
    setSecurity(e.target.checked);
  }, []);

  if (id) {
    if (loadingDetail) {
      return <LoadingScreen />;
    }

    if (errorDetail || isEmpty(infoDetail)) {
      return <ErrorScreen />;
    }
  }

  return (
    <Flex mx="auto" mt={5} direction={'column'}>
      <form onSubmit={onSubmit}>
        <Flex w="700px" direction={'column'}>
          <Flex gap={1}>
            <FieldLabel title={'Bảo mật câu hỏi'} />

            <Switch size="md" colorScheme="orange" isChecked={isSecurity} onChange={onChangeSwitch} />
          </Flex>
          <SelectCategory ref={categoryRef} />
          <SelectTopic ref={topicRef} />
          <SelectLevel ref={levelRef} />
          <FieldContent ref={contentRef} />
          <FieldAnswerA ref={answerARef} />
          <FieldAnswerB ref={answerBRef} />
          <FieldAnswerC ref={answerCRef} />
          <FieldAnswerD ref={answerDRef} />
          <InputExplan ref={explanRef} />
          <Flex justifyContent="center" mt={16} mb={10} gap={8}>
            <ButtonBack onClick={onGoBack} />

            <ButtonSubmit title={id ? 'Cập nhật' : 'Tạo mới'} isLoading={loadingAction} />
            {/* <ButtonSubmit title={id ? 'Cập nhật' : 'Tạo mới'} isLoading={loadingAction} isDisabled={disable} /> */}
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default memo(BlogCreate);
