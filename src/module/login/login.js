import { Flex, Text } from '@chakra-ui/react';
import Button from 'base-component/button/button';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default memo(() => {
  const navigate = useNavigate();
  const onLogin = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <Flex direction="column" align="center" gap={4} justify="center" w="full" h="100vh">
      <Text fontSize={18}>Vui lòng đăng nhập bằng tài khoản Giáo viên</Text>
      <Button w="fit-content" onClick={onLogin} bgColor="#f7941e" color="#fff">
        Đăng Nhập
      </Button>
    </Flex>
  );
});
