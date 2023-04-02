import { Flex, Text } from '@chakra-ui/react';
import { ROUTE_MENU_DATA } from 'layout/menu/subs/data';
import { memo, useMemo } from 'react';
import { FaChevronRight, FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
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

  const { title, route } = currentRoute;

  return (
    <Flex py={4} gap={4} alignItems="center">
      <Link to="/">
        <FaHome size={20} />
      </Link>
      <FaChevronRight color="#828282" size={13} />
      <Link to={route}>
        <Text fontWeight={600}>{title}</Text>
      </Link>
    </Flex>
  );
};

export default memo(Breadcrumb);
