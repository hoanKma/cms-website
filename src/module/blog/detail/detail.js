import { Flex, Switch, Text } from '@chakra-ui/react';
import { ButtonBack } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import FieldLabel from 'component/field-label';
import dayjs from 'dayjs';
import { memo, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import { QUESTION_LEVEL } from 'util/const';
import { useQueryDetailQuestion } from '../table/table.query';
import BlogUi from './sub/blog-ui';

const BlogDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { isLoading: loadingDetail, data: infoDetail, error: errorDetail } = useQueryDetailQuestion(id);

  const subjectData = useRecoilValue(subjectAtom);

  const onGoBack = useCallback(() => navigate(-1), [navigate]);

  if (loadingDetail) {
    return <LoadingScreen />;
  }

  if (errorDetail || !infoDetail) {
    return <ErrorScreen message={errorDetail?.message} />;
  }

  const { created_date, updated_date, security, subjectId, level } = infoDetail;

  const subject = subjectData.find((item) => item.id === subjectId) || '';

  return (
    <Flex direction="column" w={2 / 3} mx="auto" gap={10} my={10}>
      <Flex mt={5} gap={1}>
        <FieldLabel title="Bảo mật" />

        <Switch size="md" colorScheme="orange" isChecked={security} isReadOnly />
      </Flex>

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
          <Text fontWeight={500}> Chuyên đề: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'} fontWeight={700}>
            {/* {subject.label} */}
          </Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Cấp độ: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'} fontWeight={700}>
            {QUESTION_LEVEL[level].label}
          </Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Ngày tạo: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}>{dayjs(created_date).format('DD/MM/YYYY - HH:mm')}</Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Ngày cập nhật: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}> {updated_date ? dayjs(updated_date).format('DD/MM/YYYY - HH:mm') : '___'}</Text>
        </Flex>
      </Flex>

      <BlogUi infoDetail={infoDetail} />

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
            Cập nhật câu hỏi
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default memo(BlogDetail);
