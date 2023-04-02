import { Flex, Heading, Icon, Link as ChakraLink, Text } from '@chakra-ui/react';
import { ButtonBack } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import Image from 'component/image';
import ImageSlider from 'component/image-slider';
import dayjs from 'dayjs';
import { memo, useMemo, useRef } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useQueryDetail, useQueryMedia } from 'util/query';
import { useMemoFileList, useMemoImageAvatar } from '../create/subs/create.hook';
import { REPORT_TYPES, SHOW_DESCRIPTION_ROUTES, SHOW_IMAGE_ROUTES } from '../subs/data';

const ReportDetail = () => {
  const params = useParams();
  const { id, page } = params;
  const imageSliderRef = useRef();
  const {
    isLoading: loadingDetail,
    data: infoDetail,
    error: errorDetail
  } = useQueryDetail(['GET_REPORT_DETAIL', page], `/solr/report/select`, id);
  const { isLoading: loadingMedia, data: mediaList, error: errorMedia } = useQueryMedia(id);
  const showAvatar = useMemo(() => SHOW_IMAGE_ROUTES.includes(page), [page]);
  const showDescription = useMemo(() => SHOW_DESCRIPTION_ROUTES.includes(page), [page]);

  const imageAvatar = useMemoImageAvatar(mediaList);
  const fileList = useMemoFileList(mediaList);

  if (loadingDetail || loadingMedia) {
    return <LoadingScreen />;
  }

  if (errorDetail || errorMedia || !infoDetail) {
    return <ErrorScreen message={errorDetail?.message || errorMedia?.message} />;
  }

  const { title, description, date, created_date, type, more_info } = infoDetail;

  const currentType = REPORT_TYPES.find((item) => item.value === type);

  return (
    <Flex direction="column" w={2 / 3} mx="auto" gap={10} my={10}>
      <Flex>
        <Heading as="h3" fontSize={24}>
          {title}
        </Heading>
      </Flex>

      {showAvatar && (
        <Flex>
          <Flex w="30%">
            <Text fontWeight={500}>Ảnh đại diện:</Text>
          </Flex>
          <Flex flex={1}>
            {Array.isArray(imageAvatar) && !!imageAvatar.length && (
              <>
                <button onClick={() => imageSliderRef.current.show()}>
                  <Image src={imageAvatar[0]?.url} h={32} />
                </button>
                <ImageSlider images={[imageAvatar[0]?.url]} ref={imageSliderRef} />
              </>
            )}
          </Flex>
        </Flex>
      )}

      {more_info && (
        <Flex>
          <Flex w="30%">
            <Text fontWeight={500}>Năm:</Text>
          </Flex>
          <Flex flex={1}>{more_info}</Flex>
        </Flex>
      )}

      {currentType && (
        <Flex>
          <Flex w="30%">
            <Text fontWeight={500}>Phân loại:</Text>
          </Flex>
          <Flex flex={1}>{currentType.label}</Flex>
        </Flex>
      )}

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}>Thời gian:</Text>
        </Flex>
        <Flex flex={1}>{dayjs(date).format('DD/MM/YYYY - HH:mm')}</Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}>Ngày tạo:</Text>
        </Flex>
        <Flex flex={1}>
          <Text>{dayjs(created_date).format('DD/MM/YYYY - HH:mm')}</Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}>File đính kèm:</Text>
        </Flex>
        <Flex flex={1} direction="column" gap={3}>
          {Array.isArray(fileList) &&
            fileList.length &&
            fileList.map((item) => {
              const { name, url, id } = item;
              return (
                <ChakraLink
                  key={id}
                  href={url}
                  target="_blank"
                  color="link.1"
                  rel="noopener noreferrer"
                  textDecoration="underline"
                  _hover={{ color: 'link.2' }}
                  data-group
                  transitionDuration="250ms"
                >
                  <Flex gap={1}>
                    <Icon
                      as={FaFileAlt}
                      color="link.1"
                      fontSize={13.5}
                      _groupHover={{ color: 'link.2' }}
                      transitionDuration="250ms"
                    />
                    <Text noOfLines={1} as="span" mt="-5px">
                      {name}
                    </Text>
                  </Flex>
                </ChakraLink>
              );
            })}
        </Flex>
      </Flex>

      {showDescription && (
        <Flex>
          <Flex w="30%">
            <Text fontWeight={500}>Mô tả:</Text>
          </Flex>
          <Flex flex={1}>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Flex>
        </Flex>
      )}

      <Flex mt={10} gap={8} align="center">
        <Link to={`/bao-cao/${page}`}>
          <ButtonBack />
        </Link>
        <Link to={`/bao-cao/${page}/cap-nhat/${id}`}>
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

export default memo(ReportDetail);
