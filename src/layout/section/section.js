import { Flex, Text } from '@chakra-ui/react';
import { ROUTE_MENU_DATA } from 'layout/menu/subs/data';
import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const Section = () => {
  const location = useLocation();
  const { pathname } = location;
  const currentRoute = useMemo(
    () =>
      ROUTE_MENU_DATA.find((item) => {
        if (item.route === pathname) {
          return true;
        }
        if (pathname.includes('/chi-tiet')) {
          return item.route === `${pathname.split('/chi-tiet')[0]}/chi-tiet`;
        }
        if (pathname.includes('/cap-nhat')) {
          return item.route === `${pathname.split('/cap-nhat')[0]}/cap-nhat`;
        }
        return false;
      }),
    [pathname]
  );

  if (!currentRoute) {
    return null;
  }

  return (
    <Flex px={6} py={4}>
      <Text fontWeight={600} textTransform="uppercase">
        {currentRoute.title}
      </Text>
    </Flex>
  );
};

export default memo(Section);
