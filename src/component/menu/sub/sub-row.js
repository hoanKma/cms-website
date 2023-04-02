import { Button, Icon, Text } from "@chakra-ui/react";
import { memo, useCallback, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cmsMenuConfig, cmsMenuSelection } from "../recoil";

const SubRow = memo((props) => {
  const { data, index, parentIndex } = props;
  const [selection, setSelection] = useRecoilState(cmsMenuSelection);
  const config = useRecoilValue(cmsMenuConfig);

  const { title, icon, action } = data;
  const { hoverBackgroundColor, selectionBackgroundColor, textColor } = config;

  const newIndex = useMemo(
    () => (parentIndex + 1) * 1000 + index,
    [index, parentIndex]
  );

  const onClick = useCallback(() => {
    action && action(data);
    setSelection({ title, index: newIndex });
  }, [action, data, newIndex, setSelection, title]);

  return (
    <Button
      onClick={onClick}
      variant="ghost"
      justifyContent={"flex-start"}
      _hover={{ bg: hoverBackgroundColor }}
      borderRadius={0}
      w="100%"
      h={12}
      paddingLeft={7}
      backgroundColor={
        selection?.title === title && selection?.index === newIndex
          ? selectionBackgroundColor
          : undefined
      }
    >
      {icon && <Icon as={icon} color={textColor} />}
      <Text ml={icon ? 2 : 0} flex={1} textAlign="left" textColor={textColor}>
        {title}
      </Text>
    </Button>
  );
});

export default SubRow;
