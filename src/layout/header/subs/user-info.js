import { Flex, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import UserAvatarDefault from 'assets/images/user-avatar-default.png';
import { Button } from 'component/button';
import Image from 'component/image';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import { LS_KEY_SB_JWT } from 'util/const';
import { useMutationLogOut } from './mutate';

const UserInfo = () => {
  const navigate = useNavigate();
  const { mutate: logout } = useMutationLogOut();

  const onLogout = useCallback(() => {
    localStorage.removeItem(LS_KEY_SB_JWT);
    navigate('/dang-nhap');

    // logout();
  }, [navigate]);

  return (
    <Popover>
      <PopoverTrigger>
        <Flex>
          <Button borderRadius={20}>
            <Image src={UserAvatarDefault} width={9} height={9} />
            <Text as="span" ml={3}>
              Admin
            </Text>
          </Button>
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <Button width="full" onClick={onLogout}>
            Đăng xuất
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default memo(UserInfo);
