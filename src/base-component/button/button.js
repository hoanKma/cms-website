import { Button as ChakraButton } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { memo } from 'react';

const Button = (props) => {
  const {
    children,
    type = 'button',
    bgColor,
    color,
    width,
    height,
    border,
    borderWidth,
    borderRadius,
    borderColor,
    isDisabled,
    isLoading,
    _hover,
    _active,
    onClick
  } = props;

  return (
    // <ChakraProvider >
    <ChakraButton
      type={type}
      color={color}
      bgColor={bgColor}
      w={width}
      h={height}
      border={border}
      minH={0}
      minW={0}
      borderWidth={borderWidth}
      borderRadius={borderRadius}
      borderColor={borderColor}
      isDisabled={isDisabled}
      isLoading={isLoading}
      _hover={_hover}
      _active={_active}
      onClick={onClick}
    >
      {children}
    </ChakraButton>
    // </ChakraProvider>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  bgColor: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  border: PropTypes.string,
  borderWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderRadius: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  borderColor: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  _hover: PropTypes.object,
  _active: PropTypes.object
};

export default memo(Button);
