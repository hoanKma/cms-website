import { Flex, Text } from '@chakra-ui/react';
import { ButtonBack } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import FieldLabel from 'component/field-label';
import dayjs from 'dayjs';
import { Fragment, memo, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { useQueryDetailExam } from '../table/table.query';
import BlogUi from './sub/blog-ui';

const ExamDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { isLoading: loadingDetail, data: infoDetail, error: errorDetail } = useQueryDetailExam(id);

  const subjectData = useRecoilValue(subjectAtom);

  const onGoBack = useCallback(() => navigate(-1), [navigate]);

  if (loadingDetail) {
    return <LoadingScreen />;
  }

  if (errorDetail || !infoDetail) {
    return <ErrorScreen message={errorDetail?.message} />;
  }

  const { createdAt, updatedAt, publishAt, subjectId, questionIds = [], title } = infoDetail || {};

  const subject = subjectData.find((item) => item.id === subjectId) || '';

  return (
    <Flex direction="column" w={2 / 3} mx="auto" gap={10} my={10}>
      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Môn: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'} fontWeight={700}>
            {subject.label}
          </Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Tiêu đề: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'} fontWeight={700}>
            {title}
          </Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Ngày tạo: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}>{dayjs(createdAt).format('DD/MM/YYYY - HH:mm')}</Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Ngày cập nhật: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}> {updatedAt ? dayjs(updatedAt).format('DD/MM/YYYY - HH:mm') : '___'}</Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Thời gian xuất bản: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}> {publishAt ? dayjs(publishAt).format('DD/MM/YYYY - HH:mm') : '___'}</Text>
        </Flex>
      </Flex>

      <Flex direction={'column'}>
        <FieldLabel title="Đề thi" />
        <Flex direction="column" border={'1px dashed #F7941D'} borderRadius="5px" padding={'10px'} gap={4}>
          {questionIds.map((element, index) => {
            return (
              <Fragment key={index}>
                <BlogUi questionId={element} index={index} />
              </Fragment>
            );
          })}
        </Flex>
      </Flex>

      <Flex mt={10} align="center" gap={8}>
        <ButtonBack onClick={onGoBack} />

        <Link to={`/cau-hoi/cap-nhat/${id}`}>
          <Text
            bgColor="#f7941e"
            as="span"
            color="#FFF"
            px={4}
            py={2}
            borderRadius={5}
            _hover={{ bgColor: '#ec8609' }}
            _active={{ bgColor: '#ec8609' }}
          >
            Cập nhật đề thi
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default memo(ExamDetail);
