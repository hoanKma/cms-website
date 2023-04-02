import { Button, Collapse, Icon, Text, useDisclosure } from '@chakra-ui/react';
import { memo, useCallback, useMemo } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cmsMenuConfig, cmsMenuOpening, cmsMenuSelection } from '../recoil';
import SubRow from './sub-row';

const MenuRow = memo((props) => {
  const { data, index } = props;
  const [selection, setSelection] = useRecoilState(cmsMenuSelection);
  const [opening, setOpening] = useRecoilState(cmsMenuOpening);
  const config = useRecoilValue(cmsMenuConfig);
  const { canOpenMultiGroup, hoverBackgroundColor, selectionBackgroundColor, textColor } = config;
  const { title, icon, sub, action } = data;
  const hasSub = useMemo(() => Array.isArray(sub) && sub.length > 0, [sub]);
  const { isOpen, onToggle } = useDisclosure();

  const isSelected = useMemo(() => {
    if (canOpenMultiGroup === 'multiple') {
      return isOpen;
    }
    if (canOpenMultiGroup === 'single') {
      return opening === index;
    }

    return true;
  }, [canOpenMultiGroup, index, isOpen, opening]);

  const onClick = useCallback(() => {
    if (hasSub) {
      if (!canOpenMultiGroup) {
        return;
      }
      if (canOpenMultiGroup === 'multiple') {
        onToggle();
        return;
      }
      if (canOpenMultiGroup === 'single') {
        setOpening((current) => {
          if (current === index) {
            return undefined;
          }

          return index;
        });
        return;
      }
    }

    action && action(data);
    setSelection({ title, index });
  }, [action, canOpenMultiGroup, data, hasSub, index, onToggle, setOpening, setSelection, title]);

  const renderSub = () => {
    if (!hasSub) {
      return null;
    }
    if (canOpenMultiGroup === 'multiple') {
      return (
        <Collapse in={isOpen} animateOpacity>
          {renderSubContent()}
        </Collapse>
      );
    }
    if (canOpenMultiGroup === 'single') {
      return (
        <Collapse in={opening === index} animateOpacity>
          {renderSubContent()}
        </Collapse>
      );
    }

    return renderSubContent();
  };

  const renderSubContent = () => {
    return sub.map((subItem, subIndex) => (
      <SubRow key={subItem.title} data={subItem} index={subIndex} parentIndex={index} />
    ));
  };

  return (
    <>
      <Button
        onClick={() => onClick(title, index)}
        variant="ghost"
        justifyContent={'flex-start'}
        _hover={{ bg: hoverBackgroundColor }}
        borderRadius={0}
        w="100%"
        h={12}
        paddingLeft={3.5}
        backgroundColor={
          selection?.title === title && selection?.index === index ? selectionBackgroundColor : undefined
        }
      >
        {icon && <Icon as={icon} color={textColor} />}
        <Text ml={icon ? 2 : 0} flex={1} textAlign="left" textColor={textColor}>
          {title}
        </Text>
        {hasSub && (
          <Icon
            as={IoIosArrowForward}
            color={textColor}
            ml={2}
            style={{
              transform: isSelected ? 'rotate(90deg)' : undefined,
              transition: 'all 500ms'
            }}
          />
        )}
      </Button>
      {renderSub()}
    </>
  );
});

export default MenuRow;
