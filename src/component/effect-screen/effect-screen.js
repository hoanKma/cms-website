import { Flex, Text } from '@chakra-ui/react';
import Loading from 'base-component/loading';
import { memo } from 'react';

export const LoadingScreen = memo(() => {
  return (
    <Flex justifyContent="center" direction="column" align="center" w="full" mt={10} gap={10}>
      <Loading size="lg" />
      <Text>Đang tải dữ liệu...</Text>
    </Flex>
  );
});

export const ErrorScreen = memo(({ message }) => {
  return (
    <Flex alignItems="center" w="full" mt={10} direction="column" gap={5} color="red">
      <Text>Đã có lỗi xảy ra!</Text>
      {!!message && <Text>{message}</Text>}
    </Flex>
  );
});

export const NoDataScreen = memo(() => {
  return (
    <Flex alignItems="center" w="full" mt={10} direction="column" gap={5} color="red">
      <Text>Không có dữ liệu!</Text>
    </Flex>
  );
});

export const EffectScreen = memo((props) => {
  const { isLoading, errorMsg, isNoData } = props;
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (errorMsg) {
    return <ErrorScreen message={errorMsg} />;
  }

  if (isNoData) {
    return <NoDataScreen />;
  }

  return null;
});
