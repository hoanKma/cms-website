import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import equal from "fast-deep-equal";
import { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import Config from "./config";
import { cmsMenuConfig } from "./recoil";
import Content from "./sub/content";

const Menu = memo((props) => {
  const { Header, Footer, config: moreConfig, data, children } = props;
  const [config, setConfig] = useRecoilState(cmsMenuConfig);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!equal(config, { ...Config, ...moreConfig })) {
      setConfig({ ...Config, ...moreConfig });
    }
  }, [config, moreConfig, setConfig]);

  if (!config) {
    return null;
  }

  const {
    menuBackgroundColor,
    width,
    height,
    canScrollHeaderMenu,
    canScrollFooterMenu,
    mode,
  } = config;

  const renderContent = (newWidth) => (
    <Flex
      w={newWidth}
      bg={menuBackgroundColor}
      h={height}
      flexDirection="column"
    >
      {!canScrollHeaderMenu && Header}
      <Box flex={1} flexDirection="column" overflowY="auto">
        {canScrollHeaderMenu && Header}
        <Content data={data} />
        {children}
        {canScrollFooterMenu && Footer}
      </Box>
      {!canScrollFooterMenu && Footer}
    </Flex>
  );

  if (mode === "drawer") {
    return (
      <>
        <Button onClick={onOpen} colorScheme="blue">
          Button
        </Button>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>{renderContent("100%")}</DrawerContent>
        </Drawer>
      </>
    );
  }

  return renderContent(width);
});

export default Menu;
