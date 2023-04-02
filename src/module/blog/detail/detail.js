import { Flex, Heading, Switch, Text } from '@chakra-ui/react';
import { ButtonBack } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import FieldLabel from 'component/field-label';
import dayjs from 'dayjs';
import { memo, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQueryDetailQuestion } from '../table/table.query';
import BlogUi from './sub/blog-ui';

const BlogDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { isLoading: loadingDetail, data: infoDetail, error: errorDetail } = useQueryDetailQuestion(id);

  const onGoBack = useCallback(() => navigate(-1), [navigate]);

  if (loadingDetail) {
    return <LoadingScreen />;
  }

  if (errorDetail || !infoDetail) {
    return <ErrorScreen message={errorDetail?.message} />;
  }

  const { title, created_date, description, updated_date, is_hot } = infoDetail;

  return (
    <Flex direction="column" w={2 / 3} mx="auto" gap={10} my={10}>
      <Flex>
        <Heading as="h3" fontSize={24}>
          Tiêu đề: {title}
        </Heading>
      </Flex>

      <Flex mt={5} gap={1}>
        <FieldLabel title="Bài viết nổi bật" />

        <Switch size="md" colorScheme="orange" isChecked={is_hot} />
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

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Mô tả: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}>{description}</Text>
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
