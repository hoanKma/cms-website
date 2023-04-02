import { Divider, Flex } from '@chakra-ui/react';
import LogoVND from 'assets/images/logo.png';
import Image from 'component/image';
import { memo } from 'react';
import { Link } from 'react-router-dom';

const MenuHeader = () => {
  return (
    <Flex direction="column" bgColor="#29313d" position="sticky" top={0} left={0} zIndex={100} w="full" h="60px">
      <Flex
        h="full"
        w="full"
        position="sticky"
        top={0}
        left={0}
        zIndex={100}
        alignItems="center"
        px={10}
        justifyContent="center"
        color='#fff'
      >
        <Link to="/">
         Logo
        </Link>
      </Flex>
      <Divider />
    </Flex>
  );
};

export default memo(MenuHeader);
