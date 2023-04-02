import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import { ButtonBack } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import Image from 'component/image';
import dayjs from 'dayjs';
import { orderBy } from 'lodash';
import { memo, useEffect, useState } from 'react';
import { TiTick } from 'react-icons/ti';
import { Link, useParams } from 'react-router-dom';
import { useQueryDetail, useQueryMedia } from 'util/query';

const TeacherAccountDetail = () => {
  const params = useParams();
  const { id, page } = params;
  const {
    isLoading: loadingDetail,
    data: infoDetail,
    error: errorDetail
  } = useQueryDetail(['GET_BANNER_DETAIL', page], `/solr/banner/select`, id);
  const { isLoading: loadingMedia, data: mediaList = [], error: errorMedia } = useQueryMedia(id);
  const [mediaArray, setMediaArray] = useState([]);

  console.log('mediaList', mediaList);

  useEffect(() => {
    const array = orderBy(mediaList, ['description'], ['asc']);
    setMediaArray(array);
  }, [mediaList]);

  if (loadingDetail || loadingMedia) {
    return <LoadingScreen />;
  }

  if (errorDetail || errorMedia || !infoDetail) {
    return <ErrorScreen message={errorDetail?.message || errorMedia?.message} />;
  }

  const { url, created_date, enable, updated_date } = infoDetail;

  return (
    <Flex direction="column" w={2 / 3} mx="auto" gap={10} my={10}>
      <Flex>
        <Heading as="h3" fontSize={24}>
          <Text fontWeight={500} as="span">
            Màn hình hiển thị:{' '}
          </Text>
          {url}
        </Heading>
      </Flex>

      <Flex align={'center'} justify="center">
        <Flex w="30%">
          <Text fontWeight={500}>Trạng thái hiển thị: </Text>
        </Flex>
        <Flex flex={1}>
          {enable ? <Icon as={TiTick} color="green" boxSize={8} /> : <Icon as={TiTick} color="#999" boxSize={8} />}
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

      {updated_date && (
        <Flex>
          <Flex w="30%">
            <Text fontWeight={500}> Ngày cập nhật: </Text>
          </Flex>
          <Flex flex={1}>
            <Text as={'span'}>{dayjs(updated_date).format('DD/MM/YYYY - HH:mm')}</Text>
          </Flex>
        </Flex>
      )}

      <Flex>
        <Text fontWeight={500}>
          Ngày cập nhật:{' '}
          <Text as={'span'}>{updated_date ? dayjs(updated_date).format('DD/MM/YYYY - HH:mm') : '___'}</Text>
        </Text>
      </Flex>

      <Flex direction={'column'} gap={4}>
        <Flex direction="column" gap={10}>
          {mediaArray.map(({ id, url }, index) => {
            return (
              <Flex align="center" gap={5} key={id}>
                <Text
                  fontSize={28}
                  fontWeight="500"
                  color={'#fff'}
                  bg="#F2921D"
                  borderRadius={'100'}
                  border="1px dashed"
                  w="50px"
                  textAlign={'center'}
                >
                  {index + 1}
                </Text>
                <Image src={url} objectFit="contain" w="200px" h="100px" />
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <Flex mt={10} align="center" gap={4}>
        <Link to="/banners">
          <ButtonBack />
        </Link>
        <Link to={`/banners/sua-thu-tu-anh/${id}`}>
          <Text
            bgColor="#ec8609"
            as="span"
            color="#FFF"
            px={4}
            py={2}
            borderRadius={5}
            _hover={{ bgColor: '#ec8609' }}
            _active={{ bgColor: '#ec8609' }}
          >
            Thay đổi thứ tự hiển thị ảnh
          </Text>
        </Link>
        <Link to={`/banners/cap-nhat/${id}`}>
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
            Cập nhật thông tin
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default memo(TeacherAccountDetail);
