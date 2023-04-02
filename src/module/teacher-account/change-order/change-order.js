import { Flex, Heading, Text } from '@chakra-ui/react';
import { Button, ButtonBack } from 'component/button';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import Image from 'component/image';
import { orderBy } from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FiMenu } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutationUpdateMedia } from 'util/mutate';
import { useQueryDetail, useQueryMedia } from 'util/query';

const ChangeOrder = () => {
  const params = useParams();
  const { id, page } = params;
  const navigate = useNavigate();
  const {
    isLoading: loadingDetail,
    data: infoDetail,
    error: errorDetail
  } = useQueryDetail(['GET_BANNER_DETAIL', page], `/solr/banner/select`, id);
  const { isLoading: loadingMedia, data: mediaList = [], error: errorMedia } = useQueryMedia(id);
  const [mediaArray, setMediaArray] = useState([]);
  const [disable, setDisable] = useState(true);

  const { mutate: updateMedia } = useMutationUpdateMedia();

  useEffect(() => {
    const array = orderBy(mediaList, ['description'], ['asc']);
    setMediaArray(array);
  }, [mediaList]);

  const handleOnDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;
      if (disable) {
        setDisable(false);
      }
      const items = Array.from(mediaArray);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setMediaArray(items);
    },
    [disable, mediaArray]
  );

  const onClickUpdate = useCallback(() => {
    const newMediaArray = mediaArray.map((item, index) => {
      item.description = index;
      const { _version_, ...itemRest } = item;
      return itemRest;
    });
    updateMedia({ params: newMediaArray });
    navigate(-1);
  }, [mediaArray, navigate, updateMedia]);

  if (loadingDetail || loadingMedia) {
    return <LoadingScreen />;
  }

  if (errorDetail || errorMedia || !infoDetail) {
    return <ErrorScreen message={errorDetail?.message || errorMedia?.message} />;
  }

  const { url } = infoDetail;

  return (
    <Flex direction="column" w={2 / 3} mx="auto" gap={5} my={10}>
      <Flex>
        <Heading as="h3" fontSize={24}>
          <Text fontWeight={500} as="span">
            Màn hình hiển thị:{' '}
          </Text>
          {url}
        </Heading>
      </Flex>

      <Flex direction={'column'} gap={4}>
        <Text fontWeight={500}>Thứ tự hiển thị ảnh (Kéo thả để thay đổi vị trí)</Text>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="media">
            {(provided) => (
              <Flex {...provided.droppableProps} ref={provided.innerRef} direction="column" gap={4}>
                {mediaArray.map(({ id, url }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <Flex
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          align="center"
                          gap={5}
                        >
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
                          <FiMenu color="#737373" />
                        </Flex>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </Flex>
            )}
          </Droppable>
        </DragDropContext>
      </Flex>

      <Flex mt={10} align="center" gap={4}>
        <Link to={`/banners/chi-tiet/${id}`}>
          <ButtonBack />
        </Link>
        <Button
          bgColor="#f7941e"
          as="span"
          color="#FFF"
          px={4}
          py={2}
          borderRadius={5}
          isDisabled={disable}
          _hover={{ bgColor: '#ec8609' }}
          _active={{ bgColor: '#ec8609' }}
          onClick={onClickUpdate}
        >
          Sửa thứ tự
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(ChangeOrder);
