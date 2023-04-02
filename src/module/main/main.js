import { Divider, Flex } from '@chakra-ui/react';
import '@toast-ui/editor/dist/toastui-editor.css';
import Header from 'layout/header';
import MainMenu from 'layout/menu';
import Section from 'layout/section';
import { memo } from 'react';
import { Outlet } from 'react-router-dom';

export default memo(() => {
  return (
    <Flex flexDirection="column">
      <Flex>
        <MainMenu />
        <Flex minH="100vh" flex={1} borderLeft="1px solid #e6e6e6" flexDirection="column" ml="280px" overflow="hidden">
          <Header />
          <Flex p={5} bgColor="#F2F2F2" h="full" mt="64px">
            <Flex bgColor="#FFF" w="full" borderRadius={5} boxShadow="sm" direction="column">
              <Section />
              <Divider />
              <Flex p={6}>
                <Outlet />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
});
