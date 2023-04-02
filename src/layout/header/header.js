import { Flex } from '@chakra-ui/react';
import { memo } from 'react';
import Breadcrumb from './subs/breadcrumb';
import UserInfo from './subs/user-info';

const Header = () => {
  return (
    <Flex
      h="64px"
      w="-webkit-fill-available"
      position="fixed"
      top={0}
      px={6}
      left="280px"
      zIndex={1000}
      alignItems="center"
      bgColor="#FFF"
      boxShadow="sm"
      justifyContent="space-between"
    >
      <Breadcrumb />

      <Flex ml="auto">
        <UserInfo />
      </Flex>
    </Flex>
  );
};

export default memo(Header);
