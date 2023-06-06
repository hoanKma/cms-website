import { memo } from 'react';

import { Center, Flex, Heading } from '@chakra-ui/react';

import Logo from 'assets/images/logo.png';
import Image from 'component/image/image';
import LoginForm from '../../../login-form';

const LoginBox = memo(() => (
  <Center flex={1}>
    <Flex direction="column" maxW={{ xs: '425px', md: '520px', xl: '425px' }} gap={4}>
      <Flex align="center" wrap="wrap" gap={4}>
        <Image src={Logo} boxSize={{ xs: '48px', xl: '120px' }} borderRadius={100} />
        <Heading as="h1" fontSize="3xl" fontWeight={600}>
          Đăng nhập Hệ thống quản trị Exam ACE
        </Heading>
      </Flex>

      <LoginForm />
    </Flex>
  </Center>
));

export default LoginBox;
