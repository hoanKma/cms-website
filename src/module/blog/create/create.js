import { Flex, Switch } from '@chakra-ui/react';
import { ButtonBack, ButtonSubmit } from 'component/button';
import FieldLabel from 'component/field-label/field-label';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from 'state-management/user-info';
import { useMutationCreateQuestion } from './mutate';
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
  const [isHot, setIsHot] = useState(false);

  const [disable, setDisable] = useState(false);

  const userInfo = useRecoilValue(userInfoAtom);
  const correctAnswer = useRecoilValue(correctAnswerAtom);
  console.log('correctAnswer', correctAnswer);

  const { id: teacherId } = userInfo;

  // const { data: dataItem, isLoading: loadingDetail, error } = useQueryDetailQuestion(id);

  const { mutate: createQuestion, isLoading: loadingCreate } = useMutationCreateQuestion();

  const loadingAction = useMemo(() => loadingCreate, [loadingCreate]);

  // useEffect(() => {
  //     categoryRef?.current?.set(infoDetail);
  // }, []);

  // useEffect(() => {
  //   if (id && Array.isArray(dataItem) && dataItem.length > 0) {
  //     const { title, description, is_hot, content } = dataItem[0];
  //     titleRef.current?.set(title);
  //     descriptionRef.current?.set(description);
  //     contentRef.current.setHtml(content);
  //   }
  // }, [dataItem, id]);

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
        security: isHot,
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

      createQuestion(params);
    },
    [correctAnswer, createQuestion, isHot, teacherId]
  );

  const onChangeSwitch = useCallback((e) => {
    setIsHot(e.target.checked);
  }, []);

  // if (id) {
  //   if (loadingDetail) {
  //     return <LoadingScreen />;
  //   }

  //   if (error || !Array.isArray(dataItem) || dataItem.length < 1) {
  //     return <ErrorScreen />;
  //   }
  // }

  return (
    <Flex mx="auto" mt={5} direction={'column'}>
      <form onSubmit={onSubmit}>
        <Flex w="700px" direction={'column'}>
          <Flex gap={1}>
            <FieldLabel title={'Bảo mật câu hỏi'} />

            <Switch size="md" colorScheme="orange" isChecked={isHot} onChange={onChangeSwitch} />
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

            <ButtonSubmit title={id ? 'Cập nhật' : 'Tạo mới'} isLoading={loadingAction} isDisabled={disable} />
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default memo(BlogCreate);
