import { Flex } from '@chakra-ui/react';
import { ButtonBack, ButtonSubmit } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import { isEmpty } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { userInfoAtom } from 'state-management/user-info';
import { useQueryDetailExam } from '../table/table.query';
import { useMutationCreateQuestion, useMutationUpdateQuestion } from './mutate';
import CreateQuestion from './sub/create-question';
import FieldTitle from './sub/input-title';
import PublishDate from './sub/publish-date';
import SelectCategory from './sub/select-category';

const ExamCreate = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const categoryRef = useRef();
  const titleRef = useRef();
  const publishAtRef = useRef();
  // const [disable, setDisable] = useState(false);

  const userInfo = useRecoilValue(userInfoAtom);

  const subject = useRecoilValue(subjectAtom);

  const { id: teacherId } = userInfo;

  const { isLoading: loadingDetail, data: infoDetail, error: errorDetail } = useQueryDetailExam(id);

  const { mutate: createQuestion, isLoading: loadingCreate } = useMutationCreateQuestion();
  const { mutate: updateQuestion, isLoading: loadingUpdate } = useMutationUpdateQuestion(id);

  const loadingAction = useMemo(() => loadingCreate || loadingUpdate, [loadingCreate, loadingUpdate]);

  useEffect(() => {
    if (id && !isEmpty(infoDetail)) {
      const { subjectId, title, publishAt } = infoDetail;

      titleRef.current.setHtml(title);
      const subject123 = subject.find((item) => item.id === subjectId) || {};
      categoryRef.current.set(subject123);
      publishAtRef.current.set(publishAt);
    }
  }, [id, infoDetail, subject]);

  const onGoBack = useCallback(() => navigate(-1), [navigate]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const subjectId = categoryRef?.current?.get()?.id;
      const title = titleRef.current.get();
      const publishAt = publishAtRef.current.get();

      const params = {
        title,
        subjectId,
        creatorId: teacherId,
        // questionIds,
        publishAt,
        status: 'ACTIVE'
      };

      if (id) {
        // updateQuestion(params);
      } else {
        // createQuestion(params);
      }
    },
    [id, teacherId]
  );

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
          <SelectCategory ref={categoryRef} />
          <FieldTitle ref={titleRef} />
          <PublishDate />
          <CreateQuestion />
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

export default memo(ExamCreate);
