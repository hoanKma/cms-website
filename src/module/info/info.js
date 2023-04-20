import { Flex, Heading, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { ErrorScreen, LoadingScreen } from 'component/effect-screen';
import dayjs from 'dayjs';
import { useQueryUserInfo } from 'layout/header/query';
import { memo } from 'react';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { subjectAtom } from 'state-management/subject';

const InfoDetail = () => {
  const { data: userInfo, isLoading, isError } = useQueryUserInfo();

  const subjectData = useRecoilValue(subjectAtom);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !userInfo) {
    return <ErrorScreen />;
  }

  const { createdAt, fullName, subjectIds, username, id, followers } = userInfo;

  return (
    <Flex direction="column" w={2 / 3} mx="auto" gap={10} my={10}>
      <Flex>
        <Heading as="h3" fontSize={24}>
          <Text fontWeight={500} as="span">
            Thông tin tài khoản
          </Text>
        </Heading>
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

      <Link to={`./cap-nhat/${id}`}>
        <Text
          bgColor="#f7941e"
          as="span"
          color="#FFF"
          px={4}
          py={2}
          borderRadius={5}
          _hover={{ bgColor: '#ec8609' }}
          _active={{ bgColor: '#ec8609' }}
        >
          Cập nhật thông tin
        </Text>
      </Link>
    </Flex>
  );
};

export default memo(InfoDetail);
