import { Flex, Icon, Text } from '@chakra-ui/react';
import { memo, useMemo } from 'react';
import { FaFileAlt } from 'react-icons/fa';

const ItemReject = ({ item }) => {
  const type = Object.keys(item);
  const file = Object.values(item);
  const { name, title } = file[0];
  const objectName = useMemo(() => title || name, [name, title]);

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
        <Text ml={1.5}>- {type}</Text>
      </Flex>
    </Flex>
  );
};

export default memo(ItemReject);
