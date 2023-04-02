import { memo, useCallback, useMemo, useRef } from 'react';

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import LogoFacebook from 'module/login-logout/assets/logo-facebook.svg';
import LogoGoogle from 'module/login-logout/assets/logo-google.svg';
import LogoVND from 'module/login-logout/assets/logo-vnd.svg';

const LoginOther = memo(({ mt }) => {
  const modalNoFeatureRef = useRef();

  const onShowNoFeature = useCallback(() => {
    modalNoFeatureRef.current.show();
  }, []);

  const loginOtherData = useMemo(
    () => [
      {
        title: 'VNDIRECT',
        logo: LogoVND
        /**
         * Weird shit: login = logout
         * - Normally, this is redirectToVNDLogin().
         * - There's no API to invalidate iVND session.
         *   So one has to redirectToVNDLogout() to log out, which in turn
         *   invalidates session THEN redirects to iVND login.
         * - This hack works by do NOTHING to iVND when clicking logout,
         *   and only actually log out when clicking login.
         *   I.e. there's a time period between:
         *     + Client log out (clicking logout)
         *     + Server log out (clear session)
         */
        // onClick: redirectToVNDLogout
      },
      {
        title: 'Google',
        logo: LogoGoogle,
        onClick: onShowNoFeature
      },
      {
        title: 'Facebook',
        logo: LogoFacebook,
        onClick: onShowNoFeature
      }
    ],
    [onShowNoFeature]
  );

  return (
    <Flex direction="column" mt={mt} gap={5}>
      <Flex align="center" justify="center" mt={5}>
        <Box w={8} h={0.5} bg="gray.4" />
        <Text mx={4} color="gray.2">
          Hoặc đăng nhập bằng
        </Text>
        <Box w={8} h={0.5} bg="gray.4" />
      </Flex>

      <Flex justify="space-between" gap={{ xs: 2, md: 4 }}>
        {loginOtherData.map((item) => {
          const { title, logo, onClick } = item;
          return (
            <Button
              onClick={onClick}
              key={title}
              h="48px"
              flex={1}
              fontWeight={400}
              bgColor="#FFF"
              border="1px solid #bfbfbf"
              gap={{ xs: 0, md: 2 }}
            >
              <Image src={logo} h="22px" />
              <Text display={{ xs: 'none', md: 'unset' }}>{title}</Text>
            </Button>
          );
        })}
      </Flex>
    </Flex>
  );
});

export default LoginOther;
