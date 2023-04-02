import { Flex, Icon, Image, Link, Text } from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import { FaFileAlt, FaTrash } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { countChangeAtom, fileListAtom, fileListDeletedAtom } from '../recoil';

const Item = ({ item, previewImage, id }) => {
  const { name, title, url } = item;

  const objectUrl = useMemo(() => url || URL.createObjectURL(item), [item, url]);
  const objectName = useMemo(() => title || name, [name, title]);

  const setFileList = useSetRecoilState(fileListAtom(id));
  const setFileListDeleted = useSetRecoilState(fileListDeletedAtom(id));
  const setCountChange = useSetRecoilState(countChangeAtom(id));

  const onRemoveFile = useCallback(() => {
    if (url) {
      setFileListDeleted((current) => current.concat(item));
    }

    setFileList((current) => current.filter((element) => element !== item));
    setCountChange((current) => current + 1);
  }, [item, setCountChange, setFileList, setFileListDeleted, url]);

  if (previewImage) {
    return (
      <Flex alignItems="center" gap={5} my={5} mx="25%">
        <Image src={objectUrl} objectFit="contain" w="200px" h="100px" />

        <Flex cursor="pointer">
          <Icon as={FaTrash} onClick={onRemoveFile} />
        </Flex>
      </Flex>
    );
  }
  if (url) {
    return (
      <Flex
        px={3}
        py={2.5}
        borderRadius={2}
        alignItems="center"
        _hover={{ bgColor: '#F0F0F5' }}
        justifyContent="space-between"
        borderBottomWidth="1px"
      >
        <Link href={url} target="_blank" rel="noopener noreferrer" color="link.1" textDecoration={'underline'}>
          <Flex alignItems="center">
            <Icon as={FaFileAlt} />
            <Text ml={1.5} fontWeight={500}>
              {objectName}
            </Text>
          </Flex>
        </Link>

        <Flex cursor="pointer">
          <Icon as={FaTrash} onClick={onRemoveFile} />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      px={3}
      py={2.5}
      borderRadius={2}
      alignItems="center"
      _hover={{ bgColor: '#F0F0F5' }}
      justifyContent="space-between"
      borderBottomWidth="1px"
    >
      <Flex alignItems="center">
        <Icon as={FaFileAlt} />
        <Text ml={1.5} fontWeight={500}>
          {objectName}
        </Text>
      </Flex>
      <Flex cursor="pointer">
        <Icon as={FaTrash} onClick={onRemoveFile} />
      </Flex>
    </Flex>
  );
};

export default memo(Item);
