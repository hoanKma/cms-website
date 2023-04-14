import { Flex, Text } from '@chakra-ui/react';
import Menu from 'component/menu';
import { useQueryUserInfo } from 'layout/header/query';
import preval from 'preval.macro';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MAIN_COLOR } from 'util/const';
import { MENU_DATA, MENU_DATA_TEACHER } from './subs/data';
import MenuHeader from './subs/menu-header';

export const MainMenu = memo(() => {
  const config = {
    menuBackgroundColor: '#29313d',
    hoverBackgroundColor: '#f7941e',
    selectionBackgroundColor: MAIN_COLOR,
    textColor: '#f2f2f2',
    height: '100vh',
    width: '280px',
    canScrollHeader: false,
    canScrollFooter: false,
    canOpenMultiGroup: 'single', //undefined, "single", "multiple"
    mode: undefined //undefined, "drawer"
  };

  const navigate = useNavigate();
  const onNavigate = useCallback((route) => navigate(route, { replace: true }), [navigate]);

  const { data: userInfo } = useQueryUserInfo();

  const { role } = userInfo || {};

  const DATA = (role === 'ADMIN' ? MENU_DATA : MENU_DATA_TEACHER)
    .filter((item) => !item.hiddenMenu)
    .map((item) => {
      const { title, icon, route, sub: subItem } = item;
      const sub = subItem
        ? subItem
            .filter((item) => !item.hiddenMenu)
            .map((s) => ({
              title: s.title,
              icon: s.icon,
              route: s.route,
              action: () => onNavigate(s.route)
            }))
        : undefined;
      return { title, icon, sub, action: () => onNavigate(route) };
    });

  return (
    <Flex direction="column" position="fixed" top={0} left={0} w="280px">
      <MenuHeader />
      <Flex position="fixed" top="60px" left={0} pb="60px">
        <Menu config={config} data={DATA} />
      </Flex>
      <Flex pos="fixed" bottom={0} left={0} px={5} py={3} w="280px" justify="center">
        <Text color="#808080" fontSize={13}>
          Version:{' '}
          {process.env.REACT_APP_PROD === 'false' && (
            <> - {preval`module.exports = new Date().toLocaleString("vi-VN");`}</>
          )}
        </Text>
      </Flex>
    </Flex>
  );
});

export default MainMenu;
