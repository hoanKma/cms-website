import { memo } from 'react';

import { Flex } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

import { LS_KEY_SB_JWT } from 'util/const';
import Banner from './sub/banner';
import LoginBox from './sub/login-box';

const Login = memo(() => {
  // This is a quite delicate check:
  // 1. In a session: kick back to home
  // 2. Start a session:
  //   1. No token: continue to login
  //   2. HAS token: kick back to home, where it is correctly checked
  //      (exp, API call in <PrivateRoute>)
  //     + If the token is invalid there, it is DELETED,
  //       then kick back to 2.1. NO loop!
  const token = localStorage.getItem(LS_KEY_SB_JWT);
  if (token) return <Navigate to="/" replace />;

  return (
    <Flex minH="100vh">
      <Banner />
      <LoginBox />
    </Flex>
  );
});

export default Login;
