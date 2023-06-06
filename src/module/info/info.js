import { Button, Flex, Heading, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import UserAvatarDefault from 'assets/images/user-avatar-default.png';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import Image from 'component/image/image';
import dayjs from 'dayjs';
import { useQueryUserInfo } from 'layout/header/query';
import { memo, useState } from 'react';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';
import ChangeAvatarModal from './ChangeAvatarModal';
import ChangePasswordPage from './ChangePasswordPage';

const InfoDetail = () => {
  const { data: userInfo, isLoading, isError } = useQueryUserInfo();

  const subjectData = useRecoilValue(subjectAtom);

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !userInfo) {
    return <ErrorScreen />;
  }

  const { createdAt, fullName, subjectIds, username, id, followers, avatar } = userInfo;

  return (
    <Flex direction="column" w={2 / 3} mx="auto" gap={10} my={10}>
      <Flex>
        <Heading as="h3" fontSize={24}>
          <Text fontWeight={500} as="span">
            Thông tin tài khoản
          </Text>
        </Heading>
      </Flex>

      <Flex gap={8}>
        <Image src={avatar || UserAvatarDefault} height={40} borderRadius={100} />
        <Button onClick={handleOpenModal} alignSelf={'end'}>
          Đổi avatar
        </Button>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Họ tên: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}>{fullName}</Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Username: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}>{username}</Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Ngày tạo: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}>{dayjs(createdAt).format('DD/MM/YYYY - HH:mm')}</Text>
        </Flex>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Môn: </Text>
        </Flex>
        <List spacing={3}>
          {subjectIds.map((item, index) => {
            const subject123 = subjectData.find((element) => element.id === item) || {};

            return (
              <ListItem>
                <ListIcon as={IoMdCheckmarkCircle} color="green.500" />
                <Text as={'span'} key={index}>
                  {subject123.label}
                </Text>
              </ListItem>
            );
          })}
        </List>
      </Flex>

      <Flex>
        <Flex w="30%">
          <Text fontWeight={500}> Số học sinh theo dõi: </Text>
        </Flex>
        <Flex flex={1}>
          <Text as={'span'}>{followers.length} học sinh</Text>
        </Flex>
      </Flex>

      <Flex>
        <Text
          bgColor="#f7941e"
          as="span"
          color="#FFF"
          px={4}
          py={2}
          borderRadius={5}
          _hover={{ bgColor: '#ec8609' }}
          _active={{ bgColor: '#ec8609' }}
          onClick={() => setIsChangePasswordOpen(true)}
          cursor={'pointer'}
        >
          Đổi mật khẩu
        </Text>
      </Flex>
      <ChangeAvatarModal isOpen={isModalOpen} onClose={handleCloseModal} id={id} />
      <ChangePasswordPage isOpen={isChangePasswordOpen} onClose={handleCloseChangePassword} />
    </Flex>
  );
};

export default memo(InfoDetail);
