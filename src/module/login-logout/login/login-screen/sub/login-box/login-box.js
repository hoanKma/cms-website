import { memo } from 'react';

import { Center, Flex, Heading, Text } from '@chakra-ui/react';

import LoginForm from '../../../login-form';

const LoginBox = memo(() => (
  <Center flex={1}>
    <Flex direction="column" maxW={{ xs: '425px', md: '520px', xl: '425px' }}>
      <Flex
        align="center"
        wrap="wrap"
        gap={4}
        mb={{ xs: 7, xl: 4, '2xl': 7 }}
        mt={{ xs: 10, md: 20, xl: 10, '2xl': 20 }}
      >
        <Flex w={{ '2xl': '100%' }} /* Push <Heading> to the next line in 2xl */>
          {/* <Image src={logo} boxSize={{ xs: '48px', '2xl': '64px' }} /> */}
          <Text>Logo</Text>
        </Flex>
        <Heading as="h1" fontSize="3xl" fontWeight={600}>
          Đăng nhập Hệ thống quản trị Examination
        </Heading>
      </Flex>

      <LoginForm />
    </Flex>
  </Center>
));

export default LoginBox;
